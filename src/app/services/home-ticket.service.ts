import { ServerMaintenanceService } from 'src/app/services/server-maintenance.service';
import { UserState } from './../states/user.state';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Store } from '@ngxs/store';
import { ProductService } from './product.service';
import { ProductState } from '../states/product.state';
import { TicketState } from '../states/ticket.state';
import { filter, switchMap } from 'rxjs/operators';
import { PatchHomeTickets, ClearHomeTickets } from '../actions/utility.actions';
import { InteractionEnum } from '../domain/interactions';
import { SubSink } from 'subsink';
import { Subject } from 'rxjs';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';
import { RequestProviderService } from './request-provider.service';
import { DeleteTicketAction } from '../actions/ticket.actions';
import { CobreMigracaoService } from './cobre-migracao.service';
import { ConsultaMigracaoCobreDTO } from '../domain/omnichannel-dto/consulta-migracao.dto';

@Injectable({
  providedIn: 'root'
})
export class HomeTicketService {

  public subs = new SubSink();
  public cbs = [];
  public initiated = false;
  getCurrentProduct;
  constructor(
    public loginService: LoginService,
    public store: Store,
    public productService: ProductService,
    private req: RequestProviderService,
    private maintenanceService: ServerMaintenanceService,
    public cobreMigracaoService: CobreMigracaoService,
  ) { }

  init() {
    this.checkAppHealthStatus();
    if (this.initiated) {
      return;
    }
    this.getCurrentProduct = this.store.selectSnapshot(
      ProductState.getCurrentProduct
    );
    this.initiated = true;
    this.subs.sink = this.loginService.userLoggedinOnProduct
      .pipe(
        filter((u) => !!u),
        switchMap((_) => this.cleanHomeTicketsOnStore())
      )
      .subscribe((_) => {
        if (!this.loginService.isLoggedIn()) {
          return;
        }
        this.initiated = false;
        const interactions =
          this.store.selectSnapshot(ProductState.getCurrentProduct)
            .homeInteractions || [];
        (interactions || []).forEach((interaction) => {
          // disable call interaction when it is disable
          if (this.isDisabled(interaction) || this.migracaoCallCheck(interaction)) {
            return;
          }
          this.commitInteraction(interaction);
          this.registerInteraction(interaction);
        });
      });
    this.subs.sink = this.store
      .select(ProductState.getCurrentProduct)
      .subscribe(async (prod) => {
        if (this.getCurrentProduct !== prod) {
          this.execDistroyers();
        }
      });
  }

  getIteractionsThatShouldBeDisabledOnHome() {
    const list = [
      InteractionEnum.fibraConsultaStatus,
      InteractionEnum.tvConsultaStatus,
      InteractionEnum.consultaStatusFinanceiro,
      InteractionEnum.consultaEventosVulto,
      InteractionEnum.consultarMigracao,
    ];
    return list;
  }
  getIteractionsThatShouldBeDeletedLeavingHome() {
    const list = [
      InteractionEnum.fibraConsultaStatus,
      InteractionEnum.tvConsultaStatus,
      InteractionEnum.consultaStatusFinanceiro,
      InteractionEnum.consultaEventosVulto,
    ];
    return list;
  }
  isDisabled(interaction: InteractionEnum) {
    const interactionList = this.getIteractionsThatShouldBeDisabledOnHome();
    if (!interactionList.includes(interaction)) {
      return false;
    }
    const setup = this.productService.getConfigFromInteraction(interaction);
    return setup && setup.enableOnHome === false;
  }

  commitInteraction(interaction: InteractionEnum) {
    const destroy = new Subject<boolean>();
    this.cbs.push(destroy);
    const data = this.prepareData(interaction, destroy);
    this.productService.commitInteraction(interaction, data);
  }
  execDistroyers() {
    this.cbs.forEach((cb) => {
      try {
        cb.next(true);
      } catch (e) {
        // object already done
      }
    });
    this.cbs = [];
  }

  migracaoCallCheck(interaction): boolean {
    return interaction === InteractionEnum.consultarMigracao &&
      (this.store.selectSnapshot(TicketState.getTickets(interaction)) || !this.cobreMigracaoService.checkRetryCooldown());
  }

  prepareData(interaction, destroy) {
    if (interaction === InteractionEnum.consultarMigracao) {
      const data = this.createMigracaoPayload();
      this.cobreMigracaoService.init();
      return { destroy, ...data };
    }
    return { destroy };
  }

  createMigracaoPayload() {
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    const user = this.store.selectSnapshot(UserState.getUser);
    const payload = new ConsultaMigracaoCobreDTO(user, product);
    return payload;
  }

  registerInteraction(interaction: InteractionEnum) {
    this.store
      .select(TicketState.getTickets(interaction))
      .pipe(filter((t) => !!t))
      .subscribe((res) => {
        this.store.dispatch(new PatchHomeTickets(res));
      });
  }
  cleanHomeTicketsOnStore() {
    this.execDistroyers();
    return this.store.dispatch(new ClearHomeTickets());
  }

  deleteTickets() {
    const interactions = this.store.selectSnapshot(ProductState.getCurrentProduct).homeInteractions || [];
    const filteredInteractions = interactions.filter(el => this.getIteractionsThatShouldBeDeletedLeavingHome().includes(el));
    filteredInteractions.forEach(element => {
      this.store.dispatch(new DeleteTicketAction(element));
    });
  }

  destroy() {
    this.subs.unsubscribe();
  }
  async checkAppHealthStatus() {
    const url = TECNICO_VIRTUAL_API.healthStatus;
    try {
      const res = await this.req.get(url, {}).toPromise();
      const response = JSON.parse(JSON.stringify(res));
      if (response && response.hasOwnProperty('maintenance') && typeof response.maintenance === 'boolean') {
        this.maintenanceService.setMaintenance(response.maintenance);
      }
    } catch (e) {
      console.error('error check status', e);
    }
  }
}
