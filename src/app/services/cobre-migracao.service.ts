/* eslint-disable @typescript-eslint/member-ordering */
import { OmnichannelService } from './omnichannel.service';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { CobreMigracaoComponent } from './../modals/cobre-migracao/cobre-migracao.component';
import { ModalController } from '@ionic/angular';
import { LocationState } from './../states/location.state';
import { Store } from '@ngxs/store';
import { Injectable, OnDestroy } from '@angular/core';
import { TicketState } from '../states/ticket.state';
import { SubSink } from 'subsink';
import { filter, take } from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';
import { InteractionEnum } from '../domain/interactions';

@Injectable({
  providedIn: 'root'
})
export class CobreMigracaoService implements OnDestroy {

  subs = new SubSink();
  interaction = InteractionEnum.consultarMigracao;
  constructor(public store: Store,
    public modalCtrl: ModalController,
    public lStorage: LocalstorageService,
    public omnichannel: OmnichannelService) { }

  public async init() {
    this.subs.add(this.store.select(TicketState.getTickets(this.interaction))
      .pipe(
        filter(res => (res && !res.isEmExecucao)),
        take(1))
      .subscribe(async (ticket) => {
        //  Check if ticket has result and is in Home
        if (!ticket || ticket.result === 'error' || !this.isInHome()) {
          return;
        }
        const { result } = ticket;
        //  Check if should present modal
        if (!result.solicitarMigracao) {
          return;
        }
        const modal = await this.modalCtrl.create({
          component: CobreMigracaoComponent,
          componentProps: { migracaoData: result },
          cssClass: 'tec-virt-reduced-modal',
        });
        await modal.present();
        const { data: dateSelected } = await modal.onWillDismiss();
        this.sendConfirmarMigracao(dateSelected);
      }));
  }

  checkRetryCooldown(): boolean {
    const data = JSON.parse(this.lStorage.getItem('cm'));
    if (!data) {
      return true;
    }
    if (!data.rc) {
      return false;
    }
    const date = new Date(data.ts);
    const limitDate = GeneralHelper.addDays(date, data.rc);
    const today = new Date();
    return today.getTime() > limitDate.getTime();
  }

  private isInHome() {
    const location = this.store.selectSnapshot(LocationState.getLocation);
    return location === 'home';
  }

  sendConfirmarMigracao(dateSelected: any) {
    this.omnichannel.sendConfirmarMigracao(dateSelected);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
