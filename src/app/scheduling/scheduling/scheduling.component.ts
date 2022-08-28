import { ModalController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Store } from '@ngxs/store';
import { SubSink } from 'subsink';
import { ProductState } from 'src/app/states/product.state';
import { TicketState } from 'src/app/states/ticket.state';
import { InteractionEnum } from 'src/app/domain/interactions';
import { SchedulingService } from '../scheduling.service';
import { LocationAction } from 'src/app/actions/location.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingModalComponent } from 'src/app/modals/loading-modal/loading-modal/loading-modal.component';

@Component({
  selector: 'tecvirt-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent implements OnInit, OnDestroy {

  subs = new SubSink();
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public productService: ProductService,
    public store: Store,
    public schedulingService: SchedulingService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.fromTroubleshooting();
    this.store.dispatch(new LocationAction('scheduling'));
    this.subs.add(
      this.store.select(ProductState.getConfig).subscribe(cfg => {
        if (!cfg) {
          return;
        }
        this.subs.add(
          this.store
            .select(
              TicketState.getTickets(
                InteractionEnum.terminalAgendamentoConsulta
              )
            )
            .subscribe(res => {
              if (!res || !res.payload) {
                return;
              }
              const { payload } = res;
              if (!payload.agendamentos) {
                this.schedulingService.notifyLoading(false)
                return;
              }
              const { agendamentos } = payload;
              if (agendamentos.length === 0) {
                this.schedulingService.notifyLoading(false)
              }
              this.schedulingService.setAgendamentosAndFetchInfoDB(
                agendamentos
              );
              this.troubleshootingRedirect();
            })
        );
      })
    );
  }
  fromTroubleshooting() {
    this.route.queryParams.subscribe(params => {
      if (!params.fromTroubleshooting || !params.id) {
        return;
      }
    });
  }
  public async openModal() {
    const modal = await this.modalController.create({
      component: LoadingModalComponent,
      cssClass: 'tec-virt-loading-modal'
    });
    await modal.present();
  }
  troubleshootingRedirect() {
    this.route.queryParams.subscribe(params => {
      if (!params.fromTroubleshooting || !params.id) {
        return;
      }
      this.router.navigate([`visitas_tecnicas/agendar/${params.id}`]);
    });
  }
  routerActived($event) {
    // router activated
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
