import { DiagnosticHome, FibraDiagnosticHome } from './../domain/feature';
import { FalhaMassivaInfoService } from './../services/falha-massiva-info.service';
import { FeatureState } from './../states/feature.state';
import { Store } from '@ngxs/store';
import { DiagnosticHandler, createDiagnosticHandler } from './diagnostic-handler/diagnostic-handler';
import { Injectable, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { FeatureInterface } from '../domain/feature.interface';
import { ProductInterface } from '../domain/product.interface';
import { ProductState } from '../states/product.state';
import { getDiagnosticFlow } from './diagnostic-core/diagnostic-step.model';
import { DeleteTicketAction } from '../actions/ticket.actions';
import { Subject } from 'rxjs';
import { UserState } from '../states/user.state';
import { TecnologyEnum } from '../enums/tecnology.enum';
import { Router } from '@angular/router';
import { AnalyticsService } from '../core/analytics.service';
import { RequestProviderService } from '../services/request-provider.service';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService implements OnDestroy {
  subs = new SubSink();
  handler: DiagnosticHandler;
  feature: FeatureInterface;
  product: ProductInterface;
  diagnosticFlow: any;
  finishDiagnostic = new Subject<any>();
  cbs = [];
  status: any;
  public blockPage;
  constructor(public store: Store, public falhaMassivaInfo: FalhaMassivaInfoService, public router: Router, public analyticsService: AnalyticsService, private requestProviderService: RequestProviderService, public loginService: LoginService) {
  }
  init() {
    this.blockPage = undefined;
    this.status = undefined;
    const feature = this.store.selectSnapshot(FeatureState.getFeature);
    this.product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    this.feature = feature;
    this.handler = createDiagnosticHandler(feature.featureCode, this.falhaMassivaInfo);
    this.diagnosticFlow = getDiagnosticFlow(this.product.identifier);
  }
  initHome() {
    this.blockPage = undefined;
    this.status = undefined;
    this.product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    this.feature = this.product.tecnology === TecnologyEnum.FIBRA ? new FibraDiagnosticHome() : new DiagnosticHome();
    this.handler = createDiagnosticHandler(this.feature.featureCode, this.falhaMassivaInfo);
    this.diagnosticFlow = getDiagnosticFlow(this.product.identifier);
  }
  getDiagnosticFlow() {
    return this.diagnosticFlow;
  }
  async hasBlock(interaction, res) {
    const product = this.product.identifier;
    const feature = this.feature.featureCode;
    const { cpfOrCnpj } = this.store.selectSnapshot(UserState.getUser);
    if (!res || (!res.payload && !res.result)) {
      return false;
    }
    // Handler with no treatment for this request
    if (typeof (this.handler[interaction]) !== 'function') {
      return false;
    }
    const { status } = res.result || res.payload;
    const ticket = res;
    const handlerObj = {
      ...status,
      ...{ product, feature, cpfOrCnpj, ticket }
    };
    const block = await this.handler[interaction](handlerObj);
    this.blockPage = this.checkPriority(block);
    this.status = status;
    return this.blockPage;
  }
  checkPriority(block) {
    if (!this.blockPage || !block) {
      return (block || this.blockPage);
    }
    if (!this.blockPage.priority) {
      return block;
    }
    if (!block.priority) {
      return this.blockPage;
    }
    if (this.blockPage.priority > block.priority) {
      return this.blockPage;
    }
    return block;
  }
  getStepBlock(block) {
    const translate = {
      FINANCEIRO: 'financial',
      FALHA_MASSIVA: 'weather',
      REPARO: 'repair',
      LINHA: 'line',
      OS: 'repair'
    }
    if (block && block.condicao && block.condicao.tipo) {
      return translate[block.condicao.tipo];
    }
    return undefined;
  }
  registerDistroyers(cb) {
    this.cbs.push(cb);
  }
  execDistroyers() {
    this.finishDiagnostic.next(true);
    this.cbs.forEach(cb => {
      try {
        cb.next(true);
      } catch (e) {
        // object already done
      }
    });
    this.cbs = [];
  }
  resetTickets() {
    this.diagnosticFlow.checkStatusStep.forEach(el => {
      if (!el.interactions || !el.interactions.length) {
        return;
      }
      el.interactions.forEach(step => {
        const contextIdentifier = step;
        this.store.dispatch(new DeleteTicketAction({ contextIdentifier }));
      });
    });
    this.diagnosticFlow.automaticStep.forEach(el => {
      const contextIdentifier = el.interaction;
      this.store.dispatch(new DeleteTicketAction({ contextIdentifier }));
    });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}