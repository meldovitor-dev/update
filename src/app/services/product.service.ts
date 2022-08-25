/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from 'src/environments/environment';
import { timeout } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { TimeoutControlService } from './timeout-control.service';
import { InteractionEnum, InteractionModel, InteractionAsyncMethodsEnum } from './../domain/interactions';
import { ProductState } from './../states/product.state';
import { ProductTicket } from './../models/product-ticket.model';
import { ProductHelper } from './../helpers/product-helper';
import { CreateTicketAction, UpdateTicketAction } from './../actions/ticket.actions';
import { PollerService } from './poller.service';
import { Store } from '@ngxs/store';
import { TECNICO_VIRTUAL_API } from './../../environments/server-urls';
import { RequestProviderService } from './request-provider.service';
import { Injectable } from '@angular/core';
import { TicketState } from '../states/ticket.state';
import { UserState } from '../states/user.state';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private config: any;
  constructor(public http: RequestProviderService,
    public pollerService: PollerService,
    public store: Store,
    public timeoutService: TimeoutControlService,
    public modalCtrl: ModalController) { }

  public fetchConfig() {
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct).productCode;
    return this.http.get(`${TECNICO_VIRTUAL_API.config}?produto=${product}`, undefined);
  }

  public async ticketHandlerAsync(interaction: InteractionModel, url: string, data?: any) {
    const existingTicket = this.store.selectSnapshot(TicketState.getTickets(interaction.id));
    const ticket = existingTicket || await this.openTicketAndDispatch(interaction, url, data);

    if (existingTicket) {
      console.log(`Continuando ticket ${existingTicket.id} após background`);
    }

    if (!ticket) { return; }

    try {
      let destroy;
      if (data && data.destroy) {
        destroy = data.destroy;
      }
      const { interval_ms } = this.getConfigFromInteraction(interaction.id);
      let suffix = '';
      if (this.isAggregatorTicket(interaction)) {
        suffix = '/agrupador';
      }
      if (ticket && ticket.result === 'error') {
        return;
      }
      const ticketUrl = `${TECNICO_VIRTUAL_API.api}/ticket/${ticket.id}${suffix}`;
      const urlPoller = interaction.motorCCI ? `${url}?idOrdem=${ticket.id}` : ticketUrl;
      const pollerResult = await this.pollerService
        .pollerRequest(urlPoller, { interval_ms, aggregator: !!suffix }, destroy).toPromise();
      const { result } = pollerResult;
      this.dispatchTicketResult({
        ...ticket,
        ...{ isEmExecucao: false, result },
        ...ProductHelper.extractOnlyPayloadFromTicketResponse(pollerResult)
      });
    } catch (e) {
      // TODO error on poller
    }
  }
  // TODO improve how to identify agregator interactions
  public isAggregatorTicket(interaction: InteractionModel) {
    const aggregator = [
      InteractionEnum.fibraSetChannelWifi
    ];
    return aggregator.includes(interaction.id);
  }

  public dispatchTicketResult(ticket: ProductTicket) {
    //console.log('SET DELAY ==>', ticket.contextIdentifier, this.getMinDelay(ticket.contextIdentifier));
    setTimeout(() => {
      this.store.dispatch(new UpdateTicketAction(ticket));
      this.timeoutService.finish(ticket.contextIdentifier);
    }, this.getMinDelay(ticket.contextIdentifier));
  }

  public async openTicketAndDispatch(interaction: InteractionModel, url, data): Promise<ProductTicket> {
    return new Promise(async (resolve, reject) => {
      let newTicket: ProductTicket = ProductHelper.createTicket(interaction);
      try {
        let promise;
        if (interaction.asyncMethod === InteractionAsyncMethodsEnum.sync) {
          promise = Promise.resolve({ ticket: 'NA', idOrdem: 'NA' });
        } else {
          promise = this.http[interaction.requestMethod](url, data).toPromise();
        }
        const tr = await promise;
        const { idOrdem, ticket } = (tr as any);
        if (!idOrdem && !ticket) {
          this.createAnErrorTicket(newTicket);
          return resolve(undefined);
        }
        newTicket = {
          ...newTicket,
          ...{ id: (idOrdem || ticket) }
        };
        this.registerTimeout(interaction); // registering timeout countdown
        this.store.dispatch(new CreateTicketAction(newTicket));
        return resolve(newTicket);
      } catch (e) {
        this.createAnErrorTicket(newTicket);
        resolve(undefined);
      }
    });
  }

  public createAnErrorTicket(ticket) {
    const newTicket = {
      ...ticket,
      ...{
        isEmExecucao: false,
        result: 'error',
        payload: {}
      }
    };
    this.store.dispatch(new CreateTicketAction(newTicket));
  }

  public registerTimeout(interaction) {
    const config = this.getConfigFromInteraction(interaction.id);
    const { timer_espera_ms, max_timeout_ms, timeout_ms, interval_ms } = config;
    this.timeoutService.registerTimeout(interaction.id, (timer_espera_ms || max_timeout_ms || timeout_ms || 1000) / 1000);

  }

  private async ticketHandler(interaction: InteractionModel, url: string, data?: any) {
    const existingTicket = this.store.selectSnapshot(TicketState.getTickets(interaction.id));
    const newTicket = existingTicket || await this.openTicketAndDispatch(interaction, url, undefined);

    const { max_timeout_ms, timeout_ms } = this.getConfigFromInteraction(interaction.id);
    try {
      const tr = await this.http[interaction.requestMethod](url, data)
        .pipe(timeout(max_timeout_ms || timeout_ms || environment.CONFIG_CONSTANTS.DEFAULT_HTTP_TIMEOUT))
        .toPromise();
      const result = tr;
      await this.store.dispatch(new UpdateTicketAction({
        ...newTicket,
        ...{ isEmExecucao: false, result },
        ...ProductHelper.extractOnlyPayloadFromTicketResponse(tr)
      }));
    } catch (e) {
      console.log('error ==> ', e);
      this.createAnErrorTicket(newTicket);
    }
  }

  public async handlerInteraction(interaction: InteractionModel, data?: any) {
    const identifier = this.store.selectSnapshot(UserState.getUser).identifier;
    const id = this.store.selectSnapshot(UserState.getUser).id || '';
    const productCode = ProductHelper.productIdentifierToProductCode(
      this.store.selectSnapshot(ProductState.getCurrentProduct).identifier);
    const url = `${TECNICO_VIRTUAL_API.api}${interaction.relativePath}`
      .replace('{id}', identifier)
      .replace('{idProduct}', String(productCode))
      .replace('{idModel}', id);

    if (interaction.asyncMethod === InteractionAsyncMethodsEnum.sync) {
      this.ticketHandler(interaction, url, data);
      return;
    }
    this.ticketHandlerAsync(interaction, url, data);
  }

  public commitInteraction(interaction, data?: any) {
    this.handlerInteraction(ProductHelper.getInteraction(interaction), data);
  }

  public getConfigFromInteraction(interactionId: InteractionEnum) {
    const config = this.store.selectSnapshot(ProductState.getConfig);
    const interaction = ProductHelper.getInteraction(interactionId);
    const interactionConfig = ProductHelper.extractConfig(interaction, config);
    return interactionConfig;
  }
  getTimeoutInteraction(interaction) {
    return this.timeoutService.getCountdown(interaction);
  }
  getMinDelay(interaction) {
    const { min_time_remain } = this.getConfigFromInteraction(interaction);
    if (!min_time_remain) {
      return 0;
    }
    const timerCtrl = this.getTimeoutInteraction(interaction);
    const time = timerCtrl.getTimeout() - timerCtrl.getTime();
    const minTime = timerCtrl.getTimeout() - min_time_remain;
    if (time >= minTime) {
      return 0;
    }
    return minTime - time;
  }
}
