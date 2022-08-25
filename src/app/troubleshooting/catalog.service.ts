/* eslint-disable @typescript-eslint/naming-convention */
import { ConnectionState } from 'src/app/states/connection.state';
import { createTsHandler } from './ts-handler/ts-handler.factory';
import { ProductState } from './../states/product.state';
import { TsHandler } from './ts-handler/ts-handler';
import { ProductHelper } from './../helpers/product-helper';
import { CountdownTimer } from './../shared/countdown-timer';
import { TimeoutControlService } from './../services/timeout-control.service';
import { LoginService } from './../services/login.service';
import { InteractionEnum } from './../domain/interactions';
import { TicketState } from './../states/ticket.state';
import { ProductService } from './../services/product.service';
import { FeatureState } from './../states/feature.state';
import { GET_CATALOG_BY_IDENTIFIER } from './catalog-wrapper.constant';
import { CatalogModel, EventCatalogModel, LayoutCatalogModel, PageConfigModel } from './troubleshooting-interface';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FeatureSet, FeatureUnset } from '../actions/feature.action';
import { ScreenSet, ScreenStateModel } from '../actions/screen.actions';
import { filter, take, timeout, catchError } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public isLoading = false;
  catalog: CatalogModel[];
  currentPage: CatalogModel;
  history: CatalogModel[] = [];
  tsHandler: TsHandler;
  sessionData = {};
  pageConfig: PageConfigModel;
  subs = new SubSink();
  destroyers = [];

  constructor(
    public store: Store,
    public productService: ProductService,
    public loginService: LoginService,
    public timeoutService: TimeoutControlService) {
  }
  init() {
    return new Promise<void>((resolve, reject) => {
      this.subs.sink = this.store.select(FeatureState.getFeature).subscribe(p => {
        if (!p) {
          return reject();
        }
        const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
        this.isLoading = true;
        let promises = [];
        if (product && product.homeInteractions) {
          promises = product.homeInteractions.map(itr => this.store.select(TicketState.getTickets(itr)).pipe(
              filter(el => (el && !el.isEmExecucao)),
              take(1),
              timeout(10),
              catchError(err => of({}))
            ).toPromise());
        }
        Promise.all(promises).then(res => {
          const productIdentifier = product.identifier;
          this.tsHandler = createTsHandler(productIdentifier);
          const { catalogConfig } = p;
          if (!catalogConfig) {
            return reject();
          }
          this.validRules(catalogConfig);
          const { pageConfig } = this.currentPage;
          this.pageConfig = pageConfig;
          resolve();
        }).finally(() => {
          this.isLoading = false;
        });
      });
    });
  }
  validRules(catalogConfig) {
    const catalog = GET_CATALOG_BY_IDENTIFIER(catalogConfig.name);
    if (Array.isArray(catalog)) {
      this.catalog = catalog;
      this.currentPage = this.findPageOnCatalog(catalogConfig.initialPage);
      return;
    }
    const connection = this.store.selectSnapshot(ConnectionState.getConnection).connected;
    if (connection && this.loginService.isLoggedIn() && this.validProductRules()) {
      this.catalog = catalog.authenticated.catalog;
      this.currentPage = this.findPageOnCatalog(catalog.authenticated.initialPage || 0);
      return;
    }
    if (connection && this.loginService.isLoggedIn() && !this.validProductRules()) {
      this.catalog = catalog.hdmOffline ? catalog.hdmOffline.catalog : catalog.default.catalog;
      const initialPage = catalog.hdmOffline ? catalog.hdmOffline.initialPage : catalog.default.initialPage;
      this.currentPage = this.findPageOnCatalog(initialPage || 0);
      return;
    }
    this.catalog = catalog.default.catalog;
    this.currentPage = this.findPageOnCatalog(catalog.default.initialPage || 0);
  }
  validProductRules() {
    return this.tsHandler.validCatalogDependencies(this.store);
  }
  findPageOnCatalog(id) {
    return this.catalog.find(el => el.id === id);
  }
  getHistory() {
    return this.history;
  }
  resetHistory() {
    this.history = [];
  }
  getData(key) {
    return this.sessionData[key];
  }
  setData(key, value) {
    this.sessionData[key] = value;
  }
  resetData() {
    this.sessionData = {};
  }
  getPageLayout(): LayoutCatalogModel {
    if (!this.currentPage) {
      return undefined;
    }
    return this.currentPage.layout;
  }
  publicAnalytics() {
    if (!this.currentPage.gaPageName) {
      return;
    }
    const analytics: ScreenStateModel = {
      screenName: this.currentPage.gaPageName
    };
    if (this.currentPage.fluxo) {
      analytics.contextFlow = this.currentPage.fluxo;
    }
    this.store.dispatch(new ScreenSet(analytics));
  }
  publishGaAlert(gaPageName) {
    const screenName = gaPageName ? gaPageName : this.currentPage.gaPageName + '_pergunta';
    const analytics: ScreenStateModel = {
      screenName
    };
    this.store.dispatch(new ScreenSet(analytics));
  }

  getGaPageName() {
    return this.currentPage.gaPageName || '';
  }
  getState(state): EventCatalogModel {
    return this.currentPage.state.on.find(el => el.name === state);
  }
  updateCurrentPage(pageId) {
    const old = this.currentPage;
    this.currentPage = this.findPageOnCatalog(pageId);
    this.pushHistory(old);
  }
  // page needs to have some sort of layout to be pushed to history
  pushHistory(old: CatalogModel) {
    if (!old.layout) {
      return;
    }
    if (old && Object.keys(old.layout).length) {
      this.history.push(old);
    }
  }
  goPreviousPage() {
    this.currentPage = this.history.pop();
  }
  async changeFeature(params) {
    const { features } = this.store.selectSnapshot(ProductState.getCurrentProduct);
    const feature = features.find(({ featureCode }) => featureCode === params.featureId);
    const protocol = this.store.selectSnapshot(FeatureState.getFeature).protocol;
    this.store.dispatch(new FeatureUnset());
    const featureObj = { protocol, ...feature};
    await this.store.dispatch(new FeatureSet(featureObj));
  }
  callServices(interaction) {
    const data = this.tsHandler[interaction] ? this.tsHandler[interaction](this.store, this.sessionData) : undefined;
    const destroy = this.createADestroy();
    this.productService.commitInteraction(interaction, {
      ...data,
      destroy
    });
  }
  createADestroy() {
    const destroy = new Subject<boolean>();
    this.destroyers.push(destroy);
    return destroy;
  }
  consumeServices(params) {
    const data = this.tsHandler[params.call] ? this.tsHandler[params.call](this.store) : undefined;
    return data;
  }
  manualProcess(config): CountdownTimer {
    const { timeout_ms } = ProductHelper.getConfig(config);
    const countdown = new CountdownTimer(config, timeout_ms / 1000);
    countdown.start();
    return countdown;
  }
  getServiceCountdown(interaction) {
    return this.timeoutService.getCountdown(interaction);
  }
  handleServiceResponse(response: any, interaction) {
    const state = this.getState(interaction);
    this.tsHandler[interaction](state);
  }
  hasFeedback() {
    return (this.pageConfig && !!this.pageConfig.feedback && !this.getPageLayout().noFeedback);
  }
  getFeedbackAlert() {
    if (!this.currentPage.state.on.includes(this.pageConfig.feedback.state)) {
      this.currentPage.state.on.push(this.pageConfig.feedback.state);
    }
    return this.pageConfig.feedback;
  }
  execDestroyers() {
    this.destroyers.forEach(cb => {
      try {
        cb.next(true);
      } catch (e) {
        // object already done
      }
    });
    this.destroyers = [];
  }

  destroy() {
    this.subs.unsubscribe();
    this.execDestroyers();
  }
}
