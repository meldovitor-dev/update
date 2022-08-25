/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ToastService } from './../services/toast.service';
import { ScreenState } from './../states/screen.state';
import { WifiManagerService } from 'src/app/services/wifi-manager.service';
import { UrlParamsService } from './../services/url-params.service';
import { InteractionEnum } from './../domain/interactions';
import { UserState } from 'src/app/states/user.state';
import { GeneralHelper } from './../helpers/general.helper';
import { FeatureEnum } from 'src/app/enums/feature.enum';
import { OfflineHandlerComponent } from './../modals/offline-handler/offline-handler.component';
import { ConnectionState } from 'src/app/states/connection.state';
import { CallService } from './../services/call.service';
import { FeatureState } from './../states/feature.state';
import { SubSink } from 'subsink';
import { TicketState } from './../states/ticket.state';
import { LayoutCatalogModel } from './troubleshooting-interface';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { FeatureUnset } from './../actions/feature.action';
import { CatalogService } from './catalog.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LocationAction } from '../actions/location.actions';
import { Observable, Subject } from 'rxjs';
import { FeatureInterface } from '../domain/feature.interface';
import { MenuSlidesComponent } from './menu-slides/menu-slides.component';
import { DeleteTicketAction } from '../actions/ticket.actions';
import { ProductHelper } from '../helpers/product-helper';
import { ProductState } from '../states/product.state';
import { AnalyticsService } from '../core/analytics.service';
import { InAppBrowserService } from '../services/in-app-browser.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-troubleshooting',
  templateUrl: './troubleshooting.page.html',
  styleUrls: ['./troubleshooting.page.scss'],
})
export class TroubleshootingPage implements OnInit, OnDestroy {
  @Select(FeatureState.getFeature) feature$: Observable<FeatureInterface>;
  @ViewChild('tsAnchor', { static: false }) tsAnchor;
  subs = new SubSink();
  globalSubs = new SubSink();
  slidesChangeSubject = new Subject<any>();
  ticketsToBeCleared = [];
  page: LayoutCatalogModel;
  public conclusionPage = false;
  public smartvControlFlow = { cable: false, wifi: false };
  public countdown;
  public queryResult;
  public conclusionParams;
  public modal;
  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private store: Store,
    private alertController: AlertController,
    private modalController: ModalController,
    private callService: CallService,
    private analyticsService: AnalyticsService,
    private urlParamsService: UrlParamsService,
    private wifiService: WifiManagerService,
    private platform: Platform,
    private iab: InAppBrowserService,
    private toastService: ToastService
  ) {

  }
  ngOnInit() {
    this.catalogService.init().then(() => {
      this.getFirstPage();
      this.catalogService.resetHistory();
      this.store.dispatch(new LocationAction('troubleshooting'));
      this.globalSubs.sink = this.store.select(ConnectionState.getConnection).subscribe(res => {
        if (res.connected && this.modal) {
          this.modal.dismiss();
        }
      });
    }).catch(err => {
      this.router.navigate(['home']);
    });
  }
  isLoading() {
    return this.catalogService.isLoading;
  }
  getFirstPage() {
    this.page = this.catalogService.getPageLayout();
    this.catalogService.publicAnalytics();
    this.raiseEvent('onInit');
  }
  getThemePage() {
    if (!!this.page && this.page.theme) {
      return this.page.theme;
    }
    return 'light';
  }
  dispositivoEnable(params) {
    const consultaRegistro = this.store.selectSnapshot(TicketState.getTickets(InteractionEnum.bandaLargaConsultaRegistro));
    const { payload } = consultaRegistro;
    const conexaoHDM = !!(payload && payload.listDevicesWhitelistOk);
    conexaoHDM ? this.verifyServiceEnable(params) : this.changeModule(params.disable);
  }
  verifyServiceEnable(params) {
    const config = this.store.selectSnapshot(ProductState.getConfig);
    const isEnabled = ProductHelper.extractConfigValue(config, params.path);
    isEnabled ? this.nav(params.enable) : this.changeModule(params.disable);
  }
  buttonClick(btn) {
    this.raiseEvent(btn.action || btn.gaAction);
  }

  // TODO: EVENTO DE REBOOT STB
  rebootStb(evt) {
    delete evt.isSelected;
    const action = this.getHiddenButtonsAction();
    return action;
  }

  getHiddenButtonsAction() {
    if (!this.page.buttons) {
      return this.page.buttons;
    }
    const b = this.page.buttons
      .find(
        (button) => button.display === false);
    if (!b) {
      return b;
    }
    return b.action;
  }

  raiseEvent(action) {
    const state = this.catalogService.getState(action);
    if (state && state.action) {
      this.navAction(state.action);
    }
  }
  changeNetworkConfig(networkConfig) {
    if (networkConfig.type === 'password') {
      this.changePassword(networkConfig.data);
      return;
    }
    if (networkConfig.type === 'ssid') {
      this.changeSsid(networkConfig.data);
      return;
    }
    this.phoneOpenBD(networkConfig.data);
  }
  changeSsid(ssid) {
    this.catalogService.setData('ssid', ssid);
    this.raiseEvent('changeSsid');
  }
  changePassword(password) {
    this.catalogService.setData('password', password);
    this.raiseEvent('changePassword');
  }
  phoneOpenBD(phone) {
    this.catalogService.setData('phone', phone);
    this.raiseEvent('phoneOpenBD');
  }
  async updatePage() {
    this.unsubscribeAllEvents();
    for (const ticket of this.ticketsToBeCleared) {
      await this.store.dispatch(new DeleteTicketAction(ticket));
    }
    this.countdown = undefined;
    this.page = {};
    this.page = this.catalogService.getPageLayout();
    if (this.tsAnchor) {
      this.tsAnchor.nativeElement.scrollIntoView({ block: 'start' });
    }
    this.catalogService.publicAnalytics();
    // raise event
    this.raiseEvent('onInit');
  }

  callServices(params) {
    const { interaction, keepTicket } = params;
    if (!keepTicket) {
      this.ticketsToBeCleared.push(interaction);
    }
    this.catalogService.callServices(interaction);
    this.subs.add(this.store.select(TicketState.getTickets(interaction)).subscribe((ticket) => {
      if (!ticket) {
        return;
      }
      if (ticket.isEmExecucao) {
        this.countdown = this.catalogService.getServiceCountdown(interaction);
        return;
      }
      const state = this.catalogService.getState(interaction);
      const errorResults = ['timeout', 'offline'];
      if (errorResults.includes(ticket.result)) {
        this.navAction(state.action.params.timeout);
        return;
      }
      if ((ticket.result === 'error' || !ticket.payload || ticket.payload.success === false || ticket.payload.sucesso === false)
        && interaction !== InteractionEnum.fibraDiagnosticoCompleto) {
        const connection = this.store.selectSnapshot(ConnectionState.getConnection);
        if (!connection.connected) {
          this.offlineHandler(state.action.params);
          return;
        }
        const action = state.action.params.error || state.action.params.timeout;
        this.navAction(action);
        return;
      }
      this.navAction(state.action.params.success);
    }));
  }
  async offlineHandler(params) {
    this.modal = await this.modalController.create({
      component: OfflineHandlerComponent,
      cssClass: 'tec-virt-reduced-modal',
      backdropDismiss: true,
    });
    await this.modal.present();
    const result = await this.modal.onWillDismiss();
    if (result && result.data && result.data.offline) {
      const action = params.offline || params.timeout;
      this.navAction(action);
      return;
    }
    this.updatePage();
  }
  consumeServices(params) {
    return this.catalogService.consumeServices(params);
  }
  checkAuthHdmResponse(params) {
    const ticket = this.store.selectSnapshot(TicketState.getTickets(params.interaction));
    if (ticket && ticket.payload && ticket.payload.success) {
      this.navAction(params.hdmOk);
      return;
    }
    this.navAction(params.hdmNok);
  }
  shouldOpenBD(params) {
    const ticket = this.store.selectSnapshot(TicketState.getTickets(params.interaction));
    if (ticket && ticket.payload && ticket.payload.solicitarAbertura) {
      this.navAction(params.openBD);
      return;
    }
    this.navAction(params.noBD);
  }
  prepareContent(params) {
    const data = this.consumeServices(params);
    if (this.checkHandler(data)) {
      this[params.dataHandler](data);
      this.navAction(params.dataOk);
      return;
    }
    this.navAction(params.dataNok);
  }
  prepareAberturaBD(params) {
    const data = this.consumeServices(params);
    if (data && data.bdJaAberto) {
      this.navAction(params.dataHasBd);
      return;
    }
    if (data && data.bd) {
      this.bdHandler(data.bd);
      this.navAction(params.dataOk);
      return;
    }
    this.navAction(params.dataNok);
  }
  prepareNetflixContent(params) {
    const { data, filtered, stbListLength } = this.consumeServices(params);
    if (!data || data.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      stbListLength > 1 ? this.navAction(params.dataNok)
        : this.navAction(params.dataSingleNok);
      return;
    }
    this[params.dataHandler](data);
    if (filtered) {
      this.navAction(params.dataFiltered);
      return;
    }
    this.navAction(params.dataOk);
  }
  getSessionData(params) {
    const data = this.catalogService.getData(params.data);
    if (!data) {
      this.navAction(params.noData);
      return;
    }
    this.queryResult = JSON.parse(JSON.stringify(data));
  }
  checkStbListLength(params) {
    const stbList = this.catalogService.getData('dataList');
    if (stbList.length < 4) {
      this.navAction(params.dataOk);
      return;
    }
    this.navAction(params.dataNok);
  }
  getCronoTimeout() {
    const callback = () => {
      this.raiseEvent('cronoExpired');
      this.countdown.unsub(callback);
    };
    this.countdown.on('finish', callback);
  }
  manualCronometerProcess(params) {
    this.countdown = this.catalogService.manualProcess(params.config);
    const callback = () => {
      this.raiseEvent('manualCronoExpired');
      this.countdown.unsub(callback);
    };
    this.countdown.on('finish', callback);
  }
  navAction(action) {
    if (action && this[action.call]) {
      this[action.call](action.params);
    }
  }
  nav(pageId) {
    const { id } = pageId;
    this.catalogService.updateCurrentPage(id);
    this.updatePage();
  }
  goBack() {
    this.catalogService.goPreviousPage();
    this.updatePage();
  }
  smartvWifiDecision(param) {
    if (this.smartvControlFlow.cable) {
      this.nav(param.then);
      return;
    }
    this.smartvControlFlow.wifi = true;
    this.nav(param.else);
  }
  goToBD(params) {
    this.catalogService.changeFeature(params);
    const id = this.catalogService.getData('bdId');
    this.catalogService.callServices(InteractionEnum.terminalAgendamentoConsulta);
    const queryParams = {
      fromTroubleshooting: true,
      id
    };
    this.router.navigate(['visitas_tecnicas'], { queryParams });
  }
  bdHandler(data) {
    const bdId = data;
    this.catalogService.setData('bdId', bdId);
  }
  redesHandler(data) {
    const redes = data;
    redes.map(el => el.done = false);
    this.catalogService.setData('dataList', redes);
  }
  stbsHandler(data) {
    const stbs = data;
    stbs.map(el => el.done = false);
    this.catalogService.setData('dataList', stbs);
  }
  async checkIfConnectedToOiWifi(params) {
    const { redes } = this.consumeServices(params);
    if (!Array.isArray(redes) || !redes.length) {
      this.navAction(params.dataNok);
      return;
    }
    this.catalogService.setData('dataList', redes);
    this.navAction(params.dataOk);
  }
  checkHandler(data) {
    if (Array.isArray(data)) {
      return !!data.length;
    }
    return !!data;
  }
  checkDataLoopAndProceed(params) {
    const dataList = this.catalogService.getData('dataList');
    let data = this.getData(params.data);
    if (data) {
      dataList.find(el => el[params.identification] === data[params.identification]).done = true;
      data = {};
    }
    if (dataList.find(el => !el.done)) {
      this.navAction(params.then);
      return;
    }
    this.navAction(params.doneAllNetworks);
  }
  speedHandler(data) {
    const { hired, provisioned, moreThan80 } = data;
    const minInternetSpeed = (parseInt(hired, 10) * 0.8).toFixed(0);
    const hirediInternetSpeed = {
      internetSpeed: hired,
      minInternetSpeed,
    };
    const provisioningInternetSpeed = {
      provisioned,
      moreThan80,
    };
    this.catalogService.setData('hirediInternetSpeed', hirediInternetSpeed);
    this.catalogService.setData('provisioningInternetSpeed', provisioningInternetSpeed);
  }
  checkVelocity(params) {
    if (this.catalogService.getData('hirediInternetSpeed').internetSpeed) {
      this.nav(params.hasSpeed);
      return;
    }
    this.nav(params.noSpeed);
  }
  checkWifiDependencies(data) {
    console.log('DATA ===> ', data);
    if (!data) {
      this.raiseEvent('not-ok');
      return;
    }
    if (data === 'notWifiOi') {
      this.raiseEvent('not-wifi-oi');
      return;
    }
    this.raiseEvent('navigate');
  }
  checkSpeeds(params) {
    const hirediInternetSpeed = this.catalogService.getData('hirediInternetSpeed').internetSpeed;
    const provisionedSpeed = this.catalogService.getData('provisioningInternetSpeed');
    if (!provisionedSpeed.provisioned || !hirediInternetSpeed) {
      this.nav(params.noSpeed);
      return;
    }
    if (!provisionedSpeed.moreThan80) {
      this.changeModule(params.hasSpeed.isLower);
      return;
    }
    this.changeModule(params.hasSpeed.isHigher);
  }
  replaceSpeedText() {
    const internetSpeed = this.catalogService.getData('hirediInternetSpeed');
    this.page.title = this.page.title.replace('#velocidadeContratada#', internetSpeed.internetSpeed)
      .replace('#velocidadeMinimaContratual#', internetSpeed.minInternetSpeed);
    this.page.paragraph = this.page.paragraph.replace('#velocidadeMinimaContratual#', internetSpeed.minInternetSpeed);
  }
  smartvCableDecision(param) {
    if (this.smartvControlFlow.wifi) {
      this.nav(param.then);
      return;
    }
    this.smartvControlFlow.cable = true;
    this.nav(param.else);
  }
  setNoFilter(params) {
    this.catalogService.setData('noFilter', true);
    this.navAction(params.action);
  }
  setData(params) {
    if (!params || !params.data) {
      return;
    }
    params.data.forEach(data => {
      if (data && data.key && data.value) {
        this.catalogService.setData(data.key, data.value);
      }
    });
  }
  checkDataAndNav(params) {
    const { data } = params;
    const savedData = this.catalogService.getData(data.key);
    if (savedData && savedData === data.value) {
      this.changeModule(params.idOk);
      return;
    }
    this.changeModule(params.idNok);
  }
  checkIfFilter(params) {
    if (!!this.catalogService.getData('noFilter')) {
      this.changeModule(params.then);
      return;
    }
    this.changeModule(params.else);
  }
  checkEnvioPulso(params) {
    const data = this.consumeServices(params);
    if (data.permission) {
      this.changeModule(params.then.pulsoOk);
      return;
    }
    this.catalogService.setData('forecast', data.forecast);
    this.changeModule(params.then.pulsoNok);
  }
  replaceForecast() {
    const pFormated = this.page.paragraph.split('#FORECAST#');
    const data = this.getData('forecast');
    const forecast = new Date(data);
    if (!data || !(forecast instanceof Date && !isNaN(forecast.valueOf()))) {
      this.page.paragraph = pFormated[0];
      return;
    }
    const date = GeneralHelper.getDate(forecast);
    if (pFormated.length > 1 && (forecast instanceof Date && !isNaN(forecast.valueOf()))) {
      this.page.paragraph = `${pFormated[0]}Você pode tentar novamente às ${date}.`;
    }
  }
  setNearModemAndNav(params) {
    this.catalogService.setData('nearModem', true);
    this.nav(params);
  }
  async openPopup(customPopup?) {
    const alertContent = customPopup || this.page.alert;
    this.catalogService.publishGaAlert(alertContent.gaPageName);
    const alert = await this.alertController.create(
      {
        header: alertContent.title,
        backdropDismiss: false,
        message: alertContent.message,
        buttons: [
          {
            text: alertContent.buttons[0].text,
            handler: () => {
              const { action, gaAction } = alertContent.buttons[0];
              if (gaAction) {
                this.analyticsService.logEventGA(gaAction, 'click');
              }
              this.raiseEvent(action || gaAction);
            },
          },
          {
            text: alertContent.buttons[1].text,
            handler: () => {
              const { action, gaAction } = alertContent.buttons[1];
              if (gaAction) {
                this.analyticsService.logEventGA(gaAction, 'click');
              }
              this.raiseEvent(action || gaAction);
            },
          },
        ],
      },
    );
    await alert.present();
  }
  goToHome() {
    if (this.catalogService.hasFeedback()) {
      this.openPopup(this.catalogService.getFeedbackAlert());
      return;
    }
    this.navigateToHome();
  }
  navigateToHome() {
    this.router.navigate(['home']).finally(() => {
      this.store.dispatch(new FeatureUnset());
      this.catalogService.resetHistory();
    });
  }
  onClick() {
    this.openPopup();
  }
  changeModule(params) {
    if (params.id === 'conclusion') {
      this.goToConclusionPage();
      return;
    }
    if (params.id === 'success') {
      this.goToSuccessPage();
      return;
    }
    this.nav(params);
    this.catalogService.resetHistory();
  }
  slidesMenuClicked() {
    this.presentMenuSlides();
  }
  async presentMenuSlides() {
    const modal = await this.modalController.create({
      component: MenuSlidesComponent,
      componentProps: {
        slides: this.page.slides
      }
    });
    await modal.present();
    modal.onDidDismiss().then(res => {
      const { data } = res;
      if (data) {
        this.slidesChangeSubject.next(data);
      }
    });
  }
  hiddenBackButton() {
    return (!(this.catalogService.history && this.catalogService.history.length) || this.page.hiddenHeaderBackButton);
  }
  goToSuccessPage() {
    this.router.navigate(['sucesso']).finally(() => {
      this.catalogService.resetHistory();
    });
  }
  enterAnotherFeature(params) {
    this.catalogService.changeFeature(params);
    this.router.navigate(['diagnostico'], { replaceUrl: true });
  }
  buttonAccordionClick(rede) {
    this.catalogService.setData('rede', rede);
    this.raiseEvent('requestChangePassword');
  }
  buttonListRedeClick(rede) {
    this.catalogService.setData('rede', rede);
    this.raiseEvent('requestChangeSsid');
  }
  buttonStbClick(evt) {
    this.raiseEvent(evt);
  }
  buttonSelectStb(stb) {
    this.catalogService.setData('stb', stb);
  }
  buttonImageSelectorClick(state) {
    console.log(state);
    this.raiseEvent(state);
  }
  cnpjBehavior(params) {
    const { cpfOrCnpj } = this.store.selectSnapshot(UserState.getUser);
    if (!cpfOrCnpj) {
      this.navAction(params.isCnpj);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    GeneralHelper.isEmpresarial(cpfOrCnpj) ? this.navAction(params.isCnpj) : this.navAction(params.notCnpj);
  }
  getData(key) {
    return this.catalogService.getData(key);
  }
  goToConclusionPage(params?) {
    if (params && params.id) {
      this.conclusionParams = { id: params.id, continueId: params.continueId };
    }
    this.conclusionPage = true;
  }
  conclusionBtn(params) {
    const { btn, continueId } = params;
    this[btn.action](continueId);
    this.conclusionPage = false;
  }
  goToCallCenter() {
    if (this.checkIfCorpClient()) {
      this.handleCorpClient();
      return;
    }
    this.callService.callToCallCenter();
    this.goToHome();
  }
  checkIfCorpClient(): boolean {
    return this.urlParamsService.urlParamsCheck('utm_source', 'oisolucoes');
  }
  checkIfVoicenet(): boolean {
    return this.urlParamsService.isVoicenet();
  }
  handleCorpClient() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { oi_solucoes } = ProductHelper.getPhoneConfig();
    this.callService.callWithNumber(oi_solucoes);
    this.goToHome();
  }
  verifyClientCorp(params) {
    if (this.checkIfVoicenet()) {
      this.changeModule(params.disable);
      return;
    }
    const isEnabled = this.checkIfCorpClient();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isEnabled ? this.changeModule(params.enable) : this.nav(params.normal);
  }
  async verifyWifiResultFluxo(params) {
    const { rede24, rede5 } = this.wifiService.wifiInfo$.value;
    if (rede5) {
      this.nav(params.dataOk);
      return;
    }
    const compatibilityRes = await this.wifiService.is5GHzBandSupported();
    const isCompatible5Ghz = compatibilityRes['5ghzSupported'];
    if (rede24 && !isCompatible5Ghz) {
      this.nav(params.dataOk);
      return;
    }
    this.nav(params.dualBand24);
  }
  async verifyWifiResult(params) {
    const { rede24, rede5 } = this.wifiService.wifiInfo$.value;
    const compatibilityRes = await this.wifiService.is5GHzBandSupported();
    const isCompatible5Ghz = compatibilityRes['5ghzSupported'];
    if (rede24 && !isCompatible5Ghz) {
      this.nav(params.singleband);
      return;
    }
    if (rede5 && rede24) {
      this.nav(params.dualBand5);
      return;
    }
    if (!rede5 && !rede24) {
      this.nav(params.error);
      return;
    }
    this.catalogService.setData('rede24', rede24);
    this.catalogService.setData('rede5', rede5);
    const dualBandCnt = this.getData('dualBandCnt');
    this.catalogService.setData('dualBandCnt', (dualBandCnt || 0) + 1);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    dualBandCnt > 1 ? this.nav(params.dualBandError) : this.nav(params.dualBand5);
    return;
  }
  setTitleRedeCntError() {
    const rede24 = this.getData('rede24');
    this.page.title = this.page.title.replace('#REDE#', rede24 ? '5' : '2.4');
  }
  setDataAndDispatch(params) {
    this.setData(params);
    this.dispatchWifiInfo(params);
  }
  dispatchWifiInfo(params) {
    const success = params && params.success;
    const fluxo = this.store.selectSnapshot(ScreenState.getScreen).contextFlow;
    const { id } = this.store.selectSnapshot(UserState.getUser);
    this.wifiService.captureWifiInfo(id, success, fluxo);
  }
  verifyPlatform(params) {
    const p = params.platform;
    if ((p === 'android' || p === 'ios') && (this.platform.is('hybrid') && this.platform.is(p))) {
      this.nav(params.enable);
      return;
    }
    this.nav(params.disable);
  }

  goToSemConexao() {
    const params = {
      featureId: FeatureEnum.BANDA_LARGA_SEM_CONEXAO
    };
    this.enterAnotherFeature(params);
  }
  openIAB(params) {
    if (params && params.link) {
      this.iab.goToLink(params.link);
    }
  }
  checkTicketPayload(params) {
    const ticket = this.store.selectSnapshot(TicketState.getTickets(params.interaction));
    const data = this.catalogService.getData('ticket');
    if ((!ticket || !ticket.payload) && !data) {
      this.callServices(params);
      return;
    }
    this[params.call](params.params);
  }
  getTicketResponse(params) {
    const ticket = this.store.selectSnapshot(TicketState.getTickets(params.interaction));
    if (ticket) {
      this.catalogService.setData('ticket', ticket);
    }
    this[params.call](params.params);
  }
  ngOnDestroy(): void {
    this.globalSubs.unsubscribe();
    this.unsubscribeAllEvents();
    this.wifiService.wifiInfo$.next({});
    this.catalogService.resetData();
    this.catalogService.resetHistory();
  }
  unsubscribeAllEvents() {
    this.catalogService.execDestroyers();
    this.subs.unsubscribe();
    if (this.countdown) {
      this.countdown.stop();
    }
  }
}
