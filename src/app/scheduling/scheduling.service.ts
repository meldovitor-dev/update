import { Injectable } from '@angular/core';
import { RequestProviderService } from '../services/request-provider.service';
import { Store } from '@ngxs/store';
import { ProductHelper } from '../helpers/product-helper';
import { ProductState } from '../states/product.state';
import { UserState } from '../states/user.state';
import { Subject } from 'rxjs';
import { ProductCodeEnum } from '../enums/product.enum';
import { User } from '../models/user.model';
import { Agendamento, AgendamentoSlot } from '../domain/agendamento.interface';
import { environment } from 'src/environments/environment';
import { ProductService } from '../services/product.service';
import { InteractionEnum } from '../domain/interactions';
import { DeleteTicketAction } from '../actions/ticket.actions';
import { BilheteDefeitoInfoDTO } from '../domain/omnichannel-dto/bilhete-defeito-info.dto';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  public isFirstTry = true;
  public loading = false;
  public error = true;
  agendamentos = [];
  private productCode: ProductCodeEnum;
  private user: User;
  public loading$ = new Subject<boolean>();
  constructor(
    public store: Store,
    public requestService: RequestProviderService,
    public productService: ProductService) { }

  setAgendamentos(agendamentos) {
    this.agendamentos = JSON.parse(JSON.stringify(agendamentos));
  }
  getAgendamentos() {
    return this.agendamentos;
  }
  getAgendamentoById(id: string) {
    return this.agendamentos.find(el => el.id === id);
  }
  setAgendamentosAndFetchInfoDB(agendamentos = []) {
    this.error = false;
    this.populateUserInfo();
    this.setAgendamentos(agendamentos);
    if (agendamentos.find(el => (el.isReparo && (!el.visitaAnterior || !el.dadosComplementares)))) {
      this.verifyAndRegisterInfoBD();
    }
  }
  populateUserInfo() {
    this.productCode = this.store.selectSnapshot(ProductState.getCurrentProduct).productCode;
    this.user = this.store.selectSnapshot(UserState.getUser);
  }
  /**
   *  OMNICHANNEL INFORMACOS DE BD
   */
  omniChannelFetchInfoBD(agendamento) {
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    const user = this.store.selectSnapshot(UserState.getUser);
    const productCode = ProductHelper.omnichannelProductTranslator(product.productCode);
    const payload = new BilheteDefeitoInfoDTO(user, product, productCode, agendamento);
    const url = `${environment.TECNICO_VIRTUAL_API}/usuarios/infoBD`;
    return this.requestService.post(url, payload, {});
  }
  public async verifyAndRegisterInfoBD() {
    this.notifyLoading(true);
    if (!this.agendamentos.find(el => el.isReparo) || !this.isOmnichannelEnabled()) {
      this.notifyLoading(false);
      return;
    }
    for (const agendamento of this.agendamentos) {
      if (agendamento.isReparo) {
        try {
          const result = await this.omniChannelFetchInfoBD(agendamento).toPromise();
          if (!result) {
            return;
          }
          // tslint:disable-next-line: no-string-literal
          agendamento['dadosComplementares'] = (result as any).dadosComplementares;
          // tslint:disable-next-line: no-string-literal
          agendamento['visitaAnterior'] = (result as any).visitaAnterior;
          // tslint:disable-next-line: no-string-literal
          agendamento['noCallCenter'] = (result as any).noCallCenter;
        } catch (e) {
          // erro on omnichannel;
        }
      }
    }
    this.notifyLoading(false);
  }
  isOmnichannelEnabled() {
    const config = this.store.selectSnapshot(ProductState.getConfig);
    const omnichannel = ProductHelper.extractConfigValue(config, 'omniChannel');
    return (omnichannel && omnichannel.customerInteraction && omnichannel.customerInteraction.enabled);
  }
  notifyLoading(state: boolean) {
    this.loading = state;
    this.loading$.next(state);
  }
  public getDisponibilidade(agendamento: Agendamento) {
    const { serviceOrder, isReparo } = agendamento;
    const resourcePath = `${environment.TECNICO_VIRTUAL_API}/usuarios/${this.user.id}/agendamento/disponibilidade`;
    const params = [
      `tipo_produto=${this.productCode}`,
      `serviceOrder=${serviceOrder}`,
      `isReparo=${!!isReparo}`,
    ];
    const url: string = this.makeUrl(resourcePath, params);

    return this.requestService.get(url, {});
  }

  public setFeedbackDisponibilidade(agendamento: Agendamento) {
    const resourcePath = `${environment.TECNICO_VIRTUAL_API}/usuarios/${this.user.id}/agendamento/feedback`;
    const { serviceOrder } = agendamento;
    const params = [
      `tipo_produto=${this.productCode}`,
      `serviceOrder=${serviceOrder}`,
    ];
    const url: string = this.makeUrl(resourcePath, params);
    return this.requestService.post(url, {}, {});
  }

  public setAgendamento(agendamento: Agendamento, agendamentoSlot: AgendamentoSlot) {
    const resourcePath = `${environment.TECNICO_VIRTUAL_API}/usuarios/${this.user.id}/agendamento`;
    const { serviceOrder } = agendamento;
    const params = [
      `tipo_produto=${this.productCode}`,
      `serviceOrder=${serviceOrder}`,
    ];
    const url: string = this.makeUrl(resourcePath, params);
    const { slot } = agendamentoSlot;
    return this.requestService.post(url, slot, {});
  }

  public setReagendamento(agendamento: Agendamento, agendamentoSlot: AgendamentoSlot) {
    const resourcePath = `${environment.TECNICO_VIRTUAL_API}/usuarios/${this.user.id}/agendamento`;
    const { idAgendamento, serviceOrder } = agendamento;
    const params = [
      `tipo_produto=${this.productCode}`,
      `serviceOrder=${serviceOrder}`,
      `idAgendamento=${idAgendamento}`,
    ];
    const url: string = this.makeUrl(resourcePath, params);
    const { slot } = agendamentoSlot;
    return this.requestService.patch(url, slot, {});
  }

  public deleteAgendamento(agendamento: Agendamento) {
    const resourcePath = `${environment.TECNICO_VIRTUAL_API}/usuarios/${this.user.id}/agendamento`;
    const { idAgendamento, serviceOrder } = agendamento;
    const params = [
      `tipo_produto=${this.productCode}`,
      `serviceOrder=${serviceOrder}`,
      `idAgendamento=${idAgendamento}`,
    ];
    const url: string = this.makeUrl(resourcePath, params);
    return this.requestService.delete(url, {});
  }
  private makeUrl(resourcePath: string, params: string[]): string {
    return `${resourcePath}?${params.join('&')}`;
  }
  reloadTicketScheduling() {
    // TODO: adicionar logica para fazer o commit de fibra o caso abaixo so trata bandalarga
    this.store.dispatch(new DeleteTicketAction(InteractionEnum.terminalAgendamentoConsulta));
    this.productService.commitInteraction(InteractionEnum.terminalAgendamentoConsulta);
  }
  isReScheduling(sch: Agendamento) {
    return ((sch.isPendente && sch.isInvalido && sch.isEditavel) || sch.isReagendavel);
  }
  isScheduling(sch: Agendamento) {
    return (sch.isPendente && !sch.isInvalido && sch.isEditavel);
  }
}
