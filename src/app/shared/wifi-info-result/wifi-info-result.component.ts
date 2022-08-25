import { GeneralHelper } from 'src/app/helpers/general.helper';
import { LinkCatalogModel } from './../../troubleshooting/troubleshooting-interface';
import { UserState } from 'src/app/states/user.state';
import { Store } from '@ngxs/store';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WifiManagerService } from 'src/app/services/wifi-manager.service';
import { SubSink } from 'subsink';
import { FeatureState } from 'src/app/states/feature.state';
import { FeatureEnum } from 'src/app/enums/feature.enum';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'tecvirt-wifi-info-result',
  templateUrl: './wifi-info-result.component.html',
  styleUrls: ['./wifi-info-result.component.scss'],
})
export class WifiInfoResultComponent implements OnInit, OnDestroy {
  @Output() btnEvt = new EventEmitter();
  @Input() dualBandCnt = 0;
  @Input() redes = [];
  wifiInfo;
  subs = new SubSink();
  imgPath = './assets/images/troubleshooting/unlogged-area/modem-antena/';
  phoneImg5Ghz =  this.imgPath + 'celular_5.svg';
  phoneImg24Ghz =  this.imgPath + 'celular_24.svg';
  is5GhzImgPath = this.imgPath + 'redes_5.svg';
  isNot5GhzImgPath = this.imgPath + 'redes_24.svg';
  fromCard;
  linkShareObj: LinkCatalogModel = {
    gaAction: 'ver_dicas_wifi',
    label: 'Clique aqui e saiba mais detalhes sobre a diferença das duas redes.',
    action: 'sendEvent',
  };
  constructor(public wifiService: WifiManagerService,
              public store: Store,
              private iab: InAppBrowser
             ) {}

  ngOnInit() {
    this.registerWifiInfo();
    this.setContext();
    console.log('DUAL BAND COUNT ===> ', this.dualBandCnt);
  }
  async registerWifiInfo() {
    const planoContratado = this.getSanitizedPlano();
    try {
      const response = this.wifiService.wifiInfo$.value;
      if (!Object.keys(response).length) {
        return;
      }
      this.wifiInfo = {};
      Object.values(response).forEach(res => {
        if (!res.nomeDaRede || res.RSSI < -45) {
          return;
        }
        const key = res.isRede5Ghz ? 'rede5' : 'rede24';
        this.wifiInfo[key] = {
          nomeDaRede: res.nomeDaRede,
          velocidadeAparelho: res.velocidadeAparelho,
          linkSpeed: res.linkSpeed,
          isRede5Ghz: res.isRede5Ghz,
          bssid: res.bssid,
          macAddress: res.macAddress,
          bandWidth: res.bandWidth,
          RSSI: res.RSSI,
          realFrequency: res.realFrequency
        };
      });
      this.wifiInfo['isCompatible5Ghz'] = response.isCompatible5Ghz;
      this.wifiInfo['planoContratado'] =  planoContratado;
    } catch (e) {
      console.log('error info need resolve dependencies 🔥 ==> ', e);
      this.btnEvt.emit({ action: 'erro' });
    }
  }
  setContext() {
    const {featureCode } = this.store.selectSnapshot(FeatureState.getFeature);
    this.fromCard = featureCode === FeatureEnum.FIBRA_COMPATIBILIDADE_VELOCIDADES;
  }
  clickEvent(action) {
    this.btnEvt.emit({ action });
  }
  getSanitizedPlano() {
    const plano = this.store.selectSnapshot(UserState.getUser).nomeDoPlano;
    if (!plano) {
      return undefined;
    }
    const speedArray = plano.split(' ');
    const speed = speedArray.length === 3 ? speedArray[2].replace('MBps', ' Mega').replace('GB', ' Giga') : undefined;
    return speed;
  }
  repairButtonClicked() {
    const { planoContratado, rede5, rede24, isCompatible5Ghz } = this.wifiInfo;
    const wifiEvt = GeneralHelper.determineWifiInfoEvt(planoContratado, rede5, rede24, isCompatible5Ghz);
    console.log('wifiEvt ===> ', wifiEvt);
    this.btnEvt.emit({ action: wifiEvt });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  getProgressbarValue(value) {
    console.log(value)
    const speed = parseInt(value.replace(/\D/g, ''), 10);
    const plano = this.getSanitizedPlano();
    if (!plano) {
      return 1;
    }
    const planoInt = parseInt(this.getSanitizedPlano().replace(/\D/g, ''), 10);
    const percentage = speed / planoInt;
    console.log(speed, planoInt, )
    return percentage > 1 ? 1 : percentage;
  }
  goToOiPlace(){
    this.iab.create('https://www.oiplace.com.br/?utm_source=apptecnicovirtual&utm_medium=interacoes&utm_campaign=conhecaoiplace')
  }
  sendLinkShareEvent(evt){
    this.btnEvt.emit(evt)
  }
  getRedeName() {
    const frequency = this.wifiInfo.rede24 ? '5GHz' : '2.4GHz';
    const rede = this.redes.find(el => el.banda === frequency);
    if (!rede) {
      return '';
    }
    return rede.ssid;
  }
}
