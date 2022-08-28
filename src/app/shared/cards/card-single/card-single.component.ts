import { CardModalComponent } from './../../../modals/card-modal/card-modal.component';
import { Component, Input, AfterContentInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProductState } from 'src/app/states/product.state';
import { FeatureSet } from 'src/app/actions/feature.action';
import { LoginService } from 'src/app/services/login.service';
import { ModalController, Platform } from '@ionic/angular';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ConnectionState } from 'src/app/states/connection.state';
import { InteractionEnum } from 'src/app/domain/interactions';
import { TecnologyEnum } from 'src/app/enums/tecnology.enum';
import { SubSink } from 'subsink';
import { CardTypes } from './card-catalog';
import { ProtocolService } from 'src/app/services/protocol.service';
import { ServerMaintenanceService } from 'src/app/services/server-maintenance.service';
import { UserState } from 'src/app/states/user.state';

@Component({
  selector: 'tecvirt-card-single',
  templateUrl: './card-single.component.html',
  styleUrls: ['./card-single.component.scss'],
})
export class CardSingleComponent implements AfterContentInit, OnDestroy, OnChanges {
  @Input() title = '';
  @Input() icon: '';
  @Input() card;
  @Input() label;
  @Input() feature;
  @Input() tickets;
  subs = new SubSink();
  loading = false;
  ticketFinish = false;
  conexaoHDM = true;
  labelText = '';
  constructor(
    public router: Router,
    public store: Store,
    private loginService: LoginService,
    private platform: Platform,
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
    if (!this.card.needTicket) {
      return;
    }
    const consultaRegistro = ticketUpdate[InteractionEnum.bandaLargaConsultaRegistro];
    if (!consultaRegistro) {
      return;
    }
    this.loading = consultaRegistro.isEmExecucao;
    const { payload } = consultaRegistro;
    this.conexaoHDM = !!(payload && payload.listDevicesWhitelistOk);
    if (!this.conexaoHDM) {
      this.labelText =
        'O seu modem não é compatível para esta funcionalidade no momento.<br><a>Clique para saber mais<a>';
    }
  }

  ngAfterContentInit(): void {
    if (this.card) {
      const { title, label, icon } = this.card;
      this.title = title;
      this.icon = icon;
      this.label = label;
    }
  }
  isCobre(): boolean {
    const tecnology = this.store.selectSnapshot(ProductState.getCurrentProduct)
      .tecnology;
    return tecnology === TecnologyEnum.COBRE;
  }
  isLoggedIn(): boolean {
    return !!this.loginService.isLoggedIn();
  }
  showLabel() {
    return (
      this.isCobre() &&
      this.card.needTicket &&
      (!this.isLoggedIn() || !this.conexaoHDM)
    );
  }
  async presentModal() {
    if (this.conexaoHDM) {
      return;
    }
    const modal = await this.modalController.create({
      component: CardModalComponent,
      cssClass: 'tec-virt-reduced-modal',
      componentProps: {
        cardType: CardTypes.DISPOSITIVOS
      }
    });
    return await modal.present();
  }
  disableButton() {
    return this.isCobre() && this.isLoggedIn() && !this.conexaoHDM;
  }
  async onClick() {
    this.publishGaEvent(this.feature);
    if (!this.store.selectSnapshot(ConnectionState.getConnection).connected || this.serverMaintenanceService.getMaintenance()) {
      const protocol = await this.protocolService.generateProtocol(this.feature);
      const featureObj = { protocol, ...this.feature };
      this.store.dispatch(new FeatureSet(this.feature));
      this.router.navigate(['home/sem-conexao', 'funcionalidades']);
      return;
    }
    if (this.isLoggedIn()) {
      this.dispatchAndNav();
      return;
    }
    this.askLogin();
  }
  async askLogin() {
    const loginOptions = {};
    const cpfOrCnpj = this.store.selectSnapshot(UserState.getUserCpfOrCnpj);
    if (cpfOrCnpj) {
      // tslint:disable-next-line: no-string-literal
      loginOptions['cpfOrCnpj'] = cpfOrCnpj;
    }
    this.loginService.loginWithForm(LoginComponent, loginOptions).then((res: any) => {
      if (res.data && res.data.loginSuccess) {
        this.dispatchAndNav();
        return;
      }
      return;
    });
  }
  public async dispatchAndNav() {
    const protocol = await this.protocolService.generateProtocol(this.feature);
    const featureObj = { protocol, ...this.feature }
    await this.store.dispatch(new FeatureSet(featureObj)).toPromise();
    this.router.navigate(['solucao-de-problemas']);
  }
  publishGaEvent(feature) {
    const { ga } = feature;
    if (ga) {
      this.analyticsService.logEventGA(ga, 'click');
    }
  }
  checkPlataform() {
    if (this.card && !this.card.platforms) {
      return true;
    }
    const platforms = this.card.platforms;
    const result = platforms
      .map(p => {
        if (p === 'android' || p === 'ios') {
          return this.platform.is('hybrid') && this.platform.is(p);
        }
        return this.platform.is(p);
      })
      .some(el => !!el);
    return result;
  }
  shouldBeHidden() {
    if (!this.checkPlataform()) {
      return true;
    }
    return this.card && this.card.needLogin && !this.isLoggedIn();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
