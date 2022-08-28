import { TecnologyEnum } from './../../../enums/tecnology.enum';
import { Component, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProductState } from 'src/app/states/product.state';
import { FeatureSet } from 'src/app/actions/feature.action';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { FeatureEnum } from 'src/app/enums/feature.enum';
import { InteractionEnum } from 'src/app/domain/interactions';
import { SubSink } from 'subsink';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ConnectionState } from 'src/app/states/connection.state';
import { ModalController } from '@ionic/angular';
import { CardModalComponent } from 'src/app/modals/card-modal/card-modal.component';
import { CardTypes } from '../card-single/card-catalog';
import { ProtocolService } from 'src/app/services/protocol.service';
import { ServerMaintenanceService } from 'src/app/services/server-maintenance.service';
import { UserState } from 'src/app/states/user.state';

@Component({
  selector: 'tecvirt-card-multi',
  templateUrl: './card-multi.component.html',
  styleUrls: ['./card-multi.component.scss'],
})
export class CardMultiComponent implements OnChanges, OnDestroy {
  
  @Input() features;
  @Input() tickets;
  title = 'Configure suas redes';
  icon = 'network';
  labelText = 'Funcionalidade disponível somente para alguns modelos de modem.';
  loading = false;
  ticketFinish = false;
  conexaoHDM = true;
  subs = new SubSink();
  constructor(
    public router: Router,
    public store: Store,
    private loginService: LoginService,
    private analyticsService: AnalyticsService,
    public modalController: ModalController,
    public protocolService: ProtocolService,
    private serverMaintenanceService: ServerMaintenanceService
  ) { }

  ngOnChanges(change: SimpleChanges) {
    const { tickets } = change;
    if (tickets && tickets.currentValue) {
      const ticketObj = tickets.currentValue;
      this.handlerTickets(ticketObj);
    }
  }
  handlerTickets(ticketUpdate) {
    const consultaRegistro = ticketUpdate[InteractionEnum.bandaLargaConsultaRegistro];
    if (!consultaRegistro) {
      return;
    }
    this.loading = consultaRegistro.isEmExecucao;
    const { payload } = consultaRegistro;
    this.conexaoHDM = !!(payload && payload.fluxoSemConexaoComHDM);
    if (!this.conexaoHDM) {
      this.labelText =
        'O seu modem não é compatível para esta funcionalidade no momento.<br><a>Clique para saber mais<a>';
    }
  }
  getIcon(feature) {
    let icon = '';
    const icons = {
      [FeatureEnum.BANDA_LARGA_TROCA_NOME]: './assets/icon/cards-home/nome.svg',
      [FeatureEnum.FIBRA_TROCA_NOME]: './assets/icon/cards-home/nome.svg',
      [FeatureEnum.BANDA_LARGA_TROCA_SENHA]: './assets/icon/cards-home/senha.svg',
      [FeatureEnum.FIBRA_TROCA_SENHA]: './assets/icon/cards-home/senha.svg',
    };
    icon = icons[feature.featureCode] || '';

    if (icon && this.disableButton()) {
      icon = icon.replace('.svg', '_cinza.svg');
    }
    return icon;
  }
  isCobre(): boolean {
    const tecnology = this.store.selectSnapshot(ProductState.getCurrentProduct)
      .tecnology;
    return tecnology === TecnologyEnum.COBRE;
  }
  showOfflineLabel(): boolean {
    return this.isCobre() && !this.isLoggedIn();
  }
  isLoggedIn(): boolean {
    return !!this.loginService.isLoggedIn();
  }
  showLabel() {
    return this.isCobre() && (this.showOfflineLabel() || !this.conexaoHDM);
  }
  disableButton() {
    return this.isCobre() && this.isLoggedIn() && !this.conexaoHDM;
  }
  async presentModal() {
    if (this.conexaoHDM) {
      return;
    }
    const modal = await this.modalController.create({
      component: CardModalComponent,
      cssClass: 'tec-virt-reduced-modal',
      componentProps: {
        cardType: CardTypes.REDES
      }
    });
    return await modal.present();
  }
  async onClick(feature) {
    this.publishGaEvent(feature);
    if (!this.store.selectSnapshot(ConnectionState.getConnection).connected || this.serverMaintenanceService.getMaintenance()) {
      const protocol = await this.protocolService.generateProtocol(feature);
      const featureObj = { protocol, ...feature }
      await this.store.dispatch(new FeatureSet(featureObj)).toPromise();
      this.router.navigate(['home/sem-conexao', 'solucao-de-problemas']);
      return;
    }
    if (this.isLoggedIn()) {
      this.dispatchAndNav(feature);
      return;
    }
    this.askLogin(feature);
  }
  async askLogin(feature) {
    const loginOptions = {};
    const cpfOrCnpj = this.store.selectSnapshot(UserState.getUserCpfOrCnpj);
    if (cpfOrCnpj) {
      // tslint:disable-next-line: no-string-literal
      loginOptions['cpfOrCnpj'] = cpfOrCnpj;
    }
    this.loginService.loginWithForm(LoginComponent, loginOptions).then((res: any) => {
      if (res.data && res.data.loginSuccess) {
        this.dispatchAndNav(feature);
        return;
      }
      return;
    });
  }
  public async dispatchAndNav(feature) {
    const protocol = await this.protocolService.generateProtocol(feature);
    const featureObj = { protocol, ...feature }
    await this.store.dispatch(new FeatureSet(featureObj)).toPromise();
    this.router.navigate(['solucao-de-problemas']);
  }
  publishGaEvent(feature) {
    const { ga } = feature;
    if (ga) {
      this.analyticsService.logEventGA(ga, 'click');
    }
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
