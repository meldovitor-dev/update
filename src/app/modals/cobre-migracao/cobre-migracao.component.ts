import { AnalyticsService } from 'src/app/core/analytics.service';
import { ProductHelper } from 'src/app/helpers/product-helper';
import { Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';
import { getMigracaoPage } from './cobre-migracao-constants';
import { Component, OnInit, Input } from '@angular/core';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { InteractionEnum } from 'src/app/domain/interactions';
import { ProductState } from 'src/app/states/product.state';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-cobre-migracao',
  templateUrl: './cobre-migracao.component.html',
  styleUrls: ['./cobre-migracao.component.scss'],
})
export class CobreMigracaoComponent implements OnInit {

  @Input() migracaoData;
  page;
  dateList = [];
  dateSelected;
  retryCooldown = 15;
  isWLL = false;
  links = {
    wll: 'https://www.oi.com.br/migre',
  };
  constructor(public modalCtrl: ModalController,
    public store: Store,
    public lStorage: LocalstorageService,
    private iab: InAppBrowserService,
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.getInitPage();
    this.getMigracaoRetryCooldown();
  }

  getInitPage() {
    if (this.migracaoData.migracaoType === 'WLL') {
      this.isWLL = true;
      this.updatePage('wll-intro');
      return;
    }
    if (this.migracaoData.ofertaDelta) {
      this.updatePage('fibra-intro-has-delta');
      return;
    }
    this.updatePage('fibra-intro-no-delta');
  }
  updatePage(id) {
    this.page = getMigracaoPage(id);
    this.publishGa();
  }

  onClick(btn) {
    console.log(btn.action);
    if (this[btn.action]) {
      this[btn.action]();
    }
  }

  sendFeeback() {
    this.lStorage.setItem('cm', JSON.stringify({ ts: Date.now() }));
    const result = { ... this.migracaoData, migracao: true, dateSelected: this.dateSelected };
    this.dismiss(result);
  }

  sendTransbordoFeedback() {
    this.lStorage.setItem('cm', JSON.stringify({ ts: Date.now(), rc: this.retryCooldown }));
    const result = { ... this.migracaoData, migracao: true, transbordo: true };
    this.dismiss(result);
  }

  closeModal() {
    this.lStorage.setItem('cm', JSON.stringify({ ts: Date.now(), rc: this.retryCooldown }));
    const result = { ... this.migracaoData, migracao: false };
    this.dismiss(result);
  }

  dismiss(result) {
    this.modalCtrl.dismiss(result);
  }

  closeButtonModal() {
    this.analyticsService.logEventGA('fechar', 'click');
    this.closeModal();
  }

  goToNextMigrationStep() {
    this.getDate();
    const id = 'fibra-fake-agendamento';
    this.updatePage(id);
  }

  publishGa() {
    const { gaPageName, fluxo } = this.page;
    const analytics: ScreenStateModel = {
      screenName: gaPageName
    };
    if (fluxo) {
      analytics.contextFlow = fluxo;
    }
    this.store.dispatch(new ScreenSet(analytics));
  }

  updateDate(date) {
    const { gaAction } = date;
    this.dateSelected = gaAction;
  }

  getMigracaoRetryCooldown() {
    const interaction = ProductHelper.getInteraction(InteractionEnum.consultarMigracao);
    const config = this.store.selectSnapshot(ProductState.getConfig);
    const migracaoConfig = ProductHelper.extractConfig(interaction, config);
    if (migracaoConfig && migracaoConfig.retryCooldown) {
      this.retryCooldown = migracaoConfig.retryCooldown;
    }
  }

  goToConclusion() {
    if (this.dateSelected && this.dateSelected !== 'none') {
      this.updatePage('fibra-conclusao-has-data');
      return;
    }
    this.updatePage('fibra-conclusao-no-data');
  }

  goToIAB() {
    if (this.isWLL) {
      this.iab.goToLink(this.links.wll);
      this.sendTransbordoFeedback();
      return;
    }
    this.iab.goToMigracaoFibra();
    this.sendTransbordoFeedback();
  }
  getDate() {
    const today = new Date();
    const dateList = GeneralHelper.getFakeDate(today);
    this.dateList = dateList.map(el => {
      // eslint-disable-next-line max-len
      const date = `${el.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}/${el.getMonth() + 1}/${el.getFullYear()}`;
      return { label: date, feedback: date };
    });
    this.dateList.push({ label: 'Nenhuma dessas datas', feedback: '' });
  }

}
