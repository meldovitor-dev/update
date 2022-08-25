import { Store } from '@ngxs/store';
import { WifiLevelEnum } from './../../../services/wifi-manager.service';
import { WifiSignalPageModel, getWifiPage } from './wifi-signal-catalog';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NativeSettingsService } from 'src/app/services/native-settings.service';
import { WifiManagerService } from 'src/app/services/wifi-manager.service';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';

@Component({
  selector: 'tecvirt-wifi-signal-verifier',
  templateUrl: './wifi-signal-verifier.component.html',
  styleUrls: ['./wifi-signal-verifier.component.scss'],
})
export class WifiSignalVerifierComponent implements OnInit {
  wifiInfo;
  page: WifiSignalPageModel;
  has5ghz: boolean;
  tips = false;
  @Output() buttonClickEvt = new EventEmitter<any>();
  @Input() nearModem = false;
  constructor(public settingsService: NativeSettingsService,
              public wifiService: WifiManagerService,
              public store: Store,
  ) {}

  ngOnInit() {
    // this.wifiInfo = {        // for ionic serve test
    //   level: 1,
    //   SSID: 'Daniel Wi-fi',
    //   frequency: '2.4'
    // };
    this.registerWifiInfo();
  }
  async registerWifiInfo() {
        try {
          this.wifiInfo = await this.wifiService.getWifiInfo();
          this.page = getWifiPage(this.wifiInfo.level);
        } catch (e) {
          // hanler error
          this.wifiInfo = {
              level: 0,
          };
          console.log('error info need resolve dependencies 🔥 ==> ', e);
        }
        if (this.nearModem) {
          this.getNearModemPage();
          return;
        }
        this.page = getWifiPage(this.wifiInfo.level);
        const analytics: ScreenStateModel = {
          screenName: this.page.gaPageName
        };
        this.store.dispatch(new ScreenSet(analytics));
  }
  wifiSettinfgs() {
    this.settingsService.openSetting('wifi');
  }
  btnClickEvnt(btn) {
    if (btn.action === 'tips') {
      this.verifyCompatibility();
      this.page = getWifiPage('tips');
      this.tips = true;
      return;
    }
    this.buttonClickEvt.emit(btn);
  }
  verifyCompatibility() {
    this.wifiService.is5GHzBandSupported().then(res => {
      console.log('Is 5ghzSupported =>', res['5ghzSupported']);
      this.has5ghz =  res['5ghzSupported'];
    }, reason => {
      console.error(reason); // Error!
      this.has5ghz = false;
    });
  }
  getCompatibilityImage() {
    return this.has5ghz ? this.page.image.has5ghz : this.page.image.no5ghz;
  }
  getNearModemPage() {
    const level = this.wifiInfo.level;
    const nearModemPages = {
      [WifiLevelEnum.NO_SIGNAL]: getWifiPage('no-signal-near-modem'),
      [WifiLevelEnum.WEAK]: getWifiPage('weak-near-modem'),
      [WifiLevelEnum.MEDIUM]: getWifiPage('medium-near-modem'),
      [WifiLevelEnum.STRONG]: getWifiPage('strong-near-modem'),
    };
    this.page = nearModemPages[level] || getWifiPage('no-signal-near-modem');
  }
}
