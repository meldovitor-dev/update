import { FeatureInterface } from 'src/app/domain/feature.interface';
import { UrlParamsService } from './../../services/url-params.service';
import { ServerMaintenanceService } from './../../services/server-maintenance.service';
import { ProtocolService } from './../../services/protocol.service';
import { GeneralHelper } from './../../helpers/general.helper';
import { Router } from '@angular/router';
import { FeatureSet } from './../../actions/feature.action';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Feature } from 'src/app/domain/feature';
import { FeatureEnum } from 'src/app/enums/feature.enum';
import { ProductState } from 'src/app/states/product.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductInterface } from 'src/app/domain/product.interface';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ConnectionState } from 'src/app/states/connection.state';
import { UserState } from 'src/app/states/user.state';

@Component({
  selector: 'tecvirt-home-problems',
  templateUrl: './home-problems.component.html',
  styleUrls: ['./home-problems.component.scss'],
})
export class HomeProblemsComponent implements OnInit {
  @Output() viewMoreEvt = new EventEmitter<any>();
  @Output() problemSelected = new EventEmitter<any>();
  @Select(ProductState.getCurrentProduct) product$: Observable<ProductInterface>;
  constructor(private store: Store,
    private router: Router,
    private loginService: LoginService,
    private analyticsService: AnalyticsService,
    private protocolService: ProtocolService,
    private serverMaintenanceService: ServerMaintenanceService,
    private urlParamsService: UrlParamsService) { }

  ngOnInit() { }

  public getIcon(featureCode) {
    return GeneralHelper.getProblemIcon(featureCode);
  }
  getTaguemanto(featureCode) {
    const data = {
      [FeatureEnum.BANDA_LARGA_LENTA]: { gaAction: '' },
      [FeatureEnum.BANDA_LARGA_INTERMITENTE]: { gaAction: '' },
      [FeatureEnum.BANDA_LARGA_SEM_CONEXAO]: { gaAction: '' },
      [FeatureEnum.FIBRA_LENTA]: { gaAction: '' },
      [FeatureEnum.FIBRA_INTERMITENTE]: { gaAction: '' },
      [FeatureEnum.FIBRA_SEM_CONEXAO]: { gaAction: '' },
      [FeatureEnum.FIXO_LINHA_MUDA]: { gaAction: '' },
      [FeatureEnum.FIXO_NAO_FAZ_CHAMADA]: { gaAction: '' },
      [FeatureEnum.FIXO_NAO_RECEBE_CHAMADA]: { gaAction: '' },
      [FeatureEnum.FIXO_NAO_FAZ_NEM_RECEBE_CAHAMDA]: { gaAction: '' },
      [FeatureEnum.FIXO_TELEFONE_COM_RUIDO]: { gaAction: '' },
      [FeatureEnum.FIXO_LINHA_CRUZADA]: { gaAction: '' },
      [FeatureEnum.FIBRA_LINHA_MUDA]: { gaAction: '' },
      [FeatureEnum.FIBRA_NAO_FAZ_CHAMADA]: { gaAction: '' },
      [FeatureEnum.FIBRA_NAO_RECEBE_CHAMADA]: { gaAction: '' },
      [FeatureEnum.FIBRA_NAO_FAZ_NEM_RECEBE_CAHAMDA]: { gaAction: '' },
      [FeatureEnum.FIBRA_TELEFONE_COM_RUIDO]: { gaAction: '' },
      [FeatureEnum.TV_AUSENCIA_SINAL]: { gaAction: '' },
      [FeatureEnum.TV_TELA_PRETA]: { gaAction: '' },
      [FeatureEnum.TV_CARTAO_INCOMPATIVEL]: { gaAction: '' },
      [FeatureEnum.TV_SERVICO_INATIVO]: { gaAction: '' },
      [FeatureEnum.FIBRA_PROBLEMAS_TV]: { gaAction: '' },
      [FeatureEnum.FIBRA_TV_TELA_PRETA]: { gaAction: '' },
    };
    return data[featureCode] || { gaAction: '' };
  }
  getFeatureThatIsAProblem(features: Feature[]) {
    if (features && features.length) {
      return features.filter(el => (el.displayOnHome === 'problem')) || [];
    }
    return [];
  }
  onClick(evt) {
    this.analyticsService.logEventGA('descer', 'click');
    this.viewMoreEvt.emit(evt);
  }
  async goToDiagnostic(evt, feature: FeatureInterface) {
    const protocol = await this.protocolService.generateProtocol(feature);
    const featureObj = { protocol, ...feature };
    await this.store.dispatch(new FeatureSet(featureObj)).toPromise();
    if (this.shouldChangeBehavior(feature.featureCode)) {
      this.handlerVoicenet(featureObj);
      return;
    }
    if (!this.store.selectSnapshot(ConnectionState.getConnection).connected || this.serverMaintenanceService.getMaintenance()) {
      this.router.navigate(['home/sem-conexao', 'diagnostico']);
      return;
    }
    this.publishGaEvent(feature);
    if (this.loginService.isLoggedIn()) {
      this.problemSelected.emit(evt);
      this.handleDiagnostic(feature);
      return;
    }
    this.askLogin(feature);
  }
  async askLogin(feature) {
    const loginOptions = { enableSkipLogin: true };
    const cpfOrCnpj = this.store.selectSnapshot(UserState.getUserCpfOrCnpj);
    if (cpfOrCnpj) {
      // tslint:disable-next-line: no-string-literal
      loginOptions['cpfOrCnpj'] = cpfOrCnpj;
    }
    this.loginService.loginWithForm(LoginComponent, loginOptions).then((res: any) => {
      if (res.data && res.data.loginSuccess) {
        this.handleDiagnostic(feature);
        return;
      }
      if (res.data && res.data.loginSkiped) {
        this.routerToTs();
        return;
      }
      return;
    });
  }
  handleDiagnostic(feature: FeatureInterface) {
    feature.skipDiagnostic ? this.routerToTs() : this.routerToDiagnostic();
  }
  routerToDiagnostic() {
    this.router.navigate(['diagnostico']);
  }
  routerToTs() {
    this.router.navigate(['solucao-de-problemas']);
  }
  publishGaEvent(feature) {
    const { ga } = feature;
    if (ga) {
      this.analyticsService.logEventGA(ga, 'click');
    }
  }
  getFeatureThatShouldBeChanged() {
    const list = [
      FeatureEnum.FIXO_NAO_FAZ_CHAMADA,
      FeatureEnum.FIXO_NAO_RECEBE_CHAMADA,
      FeatureEnum.FIXO_NAO_FAZ_NEM_RECEBE_CAHAMDA,
      FeatureEnum.FIXO_LINHA_CRUZADA,
    ];
    return list;
  }
  checkIfVoicenet(): boolean {
    return this.urlParamsService.isVoicenet();
  }
  shouldChangeBehavior(feature: FeatureEnum): boolean {
    if (!this.checkIfVoicenet()) {
      return false;
    }
    const featureList = this.getFeatureThatShouldBeChanged();
    if (!featureList.includes(feature)) {
      return false;
    }
    return true;
  }
  async handlerVoicenet(feature: FeatureInterface) {
    const catalogConfig = this.urlParamsService.getVoicenetCatalog();
    feature.catalogConfig = catalogConfig;
    await this.store.dispatch(new FeatureSet(feature)).toPromise();
    this.routerToTs();
  }
}
