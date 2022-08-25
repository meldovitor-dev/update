/* eslint-disable @typescript-eslint/naming-convention */
import { OmnichannelService } from './../../services/omnichannel.service';
import { FalhaMassivaInfoService } from './../../services/falha-massiva-info.service';
import { BLOCK_FINANCIAL_CORP_CLIENTS } from './blocks-catalog/blocks-catalog-fibra';
import { UrlParamsService } from './../../services/url-params.service';
import { ProductState } from './../../states/product.state';
import { FeatureState } from 'src/app/states/feature.state';
import { AlertController } from '@ionic/angular';
import { GeneralHelper } from './../../helpers/general.helper';
import { UserState } from './../../states/user.state';
import { Component, OnInit } from '@angular/core';
import { DiagnosticService } from '../diagnostic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { Store } from '@ngxs/store';
import { ScreenSet, ScreenStateModel } from 'src/app/actions/screen.actions';
import { CallService } from 'src/app/services/call.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';
import { FeatureEnum } from 'src/app/enums/feature.enum';
import { FeatureUnset, FeatureSet } from 'src/app/actions/feature.action';
import { UtilityState } from 'src/app/states/utility.state';
import { BlockTypes } from 'src/app/enums/catalog.enum';
import { ProductHelper } from 'src/app/helpers/product-helper';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-diagnostic-blocks',
  templateUrl: './diagnostic-blocks.component.html',
  styleUrls: ['./diagnostic-blocks.component.scss']
})
export class DiagnosticBlocksComponent implements OnInit {
  page;
  blockIcon;
  constructor(
    public diagnosticService: DiagnosticService,
    public router: Router,
    public route: ActivatedRoute,
    public analyticsService: AnalyticsService,
    public store: Store,
    public call: CallService,
    public iab: InAppBrowserService,
    public alertController: AlertController,
    public urlParamsService: UrlParamsService,
    public falhaMassivaInfoService: FalhaMassivaInfoService,
    public omnichannel: OmnichannelService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = params.fromCardDiag
        ? this.store.selectSnapshot(UtilityState.getDiagnosticConclusion)
        : this.diagnosticService.blockPage;
      if (this.checkIfCorpClient() && this.hastype(this.page) && this.page.condicao.tipo === BlockTypes.FINANCEIRO) {
        this.handleCorpClient();
      }
    });
    this.handleFalhaMassiva();
    this.handleNetQNok();
    this.setupIcon();
    this.publishGa();
  }
  hastype(page): boolean {
    return !!(page && page.condicao && page.condicao.tipo);
  }
  setupIcon() {
    if (!this.hastype(this.page)) {
      return;
    }
    this.blockIcon = `${this.page.condicao.tipo}`.toLocaleLowerCase();
  }
  publishGa() {
    const { gaPageName } = this.page;
    if (gaPageName) {
      this.store.dispatch(
        new ScreenSet({
          screenName: gaPageName
        })
      );
    }
  }
  checkIfCorpClient(): boolean {
    return this.urlParamsService.urlParamsCheck('utm_source', 'oisolucoes');
  }
  handleCorpClient() {
    this.page = BLOCK_FINANCIAL_CORP_CLIENTS;
  }
  handleCorpClientCallCenter() {
    const { oi_solucoes } = ProductHelper.getPhoneConfig();
    this.call.callWithNumber(oi_solucoes);
  }
  handleNetQNok() {
    if (this.page.id === 'NETQ_NOK') {
      this.omnichannel.sendNetQNok();
    }
  }
  buttonClicked(btn) {
    const { acao } = btn;
    this[acao.nome](acao.params);
  }
  goToMinhaOi(params) {
    this.iab.goToMinhaOi();
  }
  goToOiSolucoes(params) {
    this.iab.goToOiSolucoes();
  }
  goToHome(params) {
    this.router.navigateByUrl('home');
  }
  goToCallCenter() {
    if (this.checkIfCorpClient() ) {
      this.handleCorpClientCallCenter();
      return;
    }
    this.call.callToCallCenter();
  }
  goToOiMaisEmpresas() {
    this.iab.goToOiMaisEmpresas();
  }
  goToJoice() {
    this.iab.goToJoice();
  }
  goToPagarConta(){
    this.router.navigateByUrl('pagar-conta');
  }
  goToAgendamento() {
    this.router.navigate(['visitas_tecnicas']);
  }
  nav(context) {
    this.page = context.page;
    this.publishGa();
  }
  getExtraInfoTxt() {
    const cpfOrCnpj = this.store.selectSnapshot(UserState.getUser).cpfOrCnpj;
    if (GeneralHelper.isEmpresarial(cpfOrCnpj)) {
      return (
        '<strong>ATENÇÃO:</strong> ' +
        'Por aqui você tem a mesma informação que receberia por telefone e ainda pode acompanhar as atualizações.'
      );
    }
    return (
      'ATENÇÃO:<br/>Ative as notificações do app para ser avisado quando o reparo estiver concluído.<br><br>'+
      'Por aqui você tem a mesma informação que receberia por telefone.'
    );
  }
  goToTroubleshootPage() {
    this.router.navigate(['solucao-de-problemas']);
  }
  verifyCurrentProblem(params) {
    const isAusenciaSinal =
      this.store.selectSnapshot(FeatureState.getFeature).featureCode ===
      FeatureEnum.TV_AUSENCIA_SINAL;
    if (isAusenciaSinal) {
      this.goToTroubleshootPage();
      return;
    }

    this.nav(params);
  }
  async goToAusenciaSinal() {
    const feature = this.store
      .selectSnapshot(ProductState.getCurrentProduct)
      .features.find(el => el.featureCode === FeatureEnum.TV_AUSENCIA_SINAL);
    const protocol = this.store.selectSnapshot(FeatureState.getFeature)
      .protocol;
    await this.store.dispatch(new FeatureUnset()).toPromise();
    const featureObj = { protocol, ...feature };
    await this.store.dispatch(new FeatureSet(featureObj)).toPromise();
    this.goToTroubleshootPage();
  }
  async openPopUp() {
    const alertPage = this.page.alert;
    this.publishGaAlert(alertPage.gaPageName);
    const alert = await this.alertController.create({
      header: alertPage.title,
      backdropDismiss: false,
      message: alertPage.paragraph,
      buttons: [
        {
          text: alertPage.buttons[0].text,
          handler: () => {
            const { action, gaAction } = alertPage.buttons[0];
            if (gaAction) {
              this.analyticsService.logEventGA(gaAction, 'click');
            }
            this.goToTroubleshootPage();
          }
        },
        {
          text: alertPage.buttons[1].text,
          handler: () => {
            const { action, gaAction, params } = alertPage.buttons[1];
            if (gaAction) {
              this.analyticsService.logEventGA(gaAction, 'click');
            }
            this.nav(params);
          }
        }
      ]
    });
    await alert.present();
  }
  publishGaAlert(gaAlertName) {
    if (!gaAlertName) {
      return;
    }
    const screenName = gaAlertName;
    const analytics: ScreenStateModel = { screenName };
    this.store.dispatch(new ScreenSet(analytics));
  }
  handleFalhaMassiva() {
    if (this.page && this.page.condicao && this.page.condicao.tipo === BlockTypes.FALHA_MASSIVA &&
        this.falhaMassivaInfoService.falhaMassivaId) {
      console.log(this.falhaMassivaInfoService.falhaMassivaId);
      const updateObj = {
        idFalhaMassiva: this.falhaMassivaInfoService.falhaMassivaId,
        consulted: true
      };
      this.falhaMassivaInfoService.patchFalhaMassiva(updateObj);
    }
  }
}
