/* eslint-disable @typescript-eslint/no-shadow */
import { ProductService } from './../../services/product.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { InteractionEnum } from 'src/app/domain/interactions';
import { TicketState } from 'src/app/states/ticket.state';
import { filter, take } from 'rxjs/operators';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-cobre-extra-step',
  templateUrl: './cobre-extra-step.component.html',
  styleUrls: ['./cobre-extra-step.component.scss'],
})
export class CobreExtraStepComponent implements OnInit {
  loadingStep = true;
  notCobreStep = false;
  constructor(public modalController: ModalController,
    public store: Store,
    public productService: ProductService,
  ) { }

  async ngOnInit() {
    this.productService.commitInteraction(InteractionEnum.consultaStatusFinanceiro);
    const res = await this.store.select(TicketState.getTickets(InteractionEnum.consultaStatusFinanceiro))
      .pipe(
        filter(res => (res && !res.isEmExecucao)),
        take(1)
      ).subscribe(res => {
        if (res && res.result === 'OK' && res.payload && res.payload.hasOwnProperty('isCobre') && !res.payload.isCobre) {
          this.loadingStep = false;
          this.notCobreStep = true;
          return;
        }
        this.modalController.dismiss();
      }, err => {
        console.error(err);
        this.modalController.dismiss();
      });

  }

  onClick(change, tag) {
    //TODO TAGUEMAENTO
    this.modalController.dismiss({ action: true, change });
  }

}
