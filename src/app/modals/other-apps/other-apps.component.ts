import { ModalController, Platform } from '@ionic/angular';
import { APPS_OI, AppsOiModel } from './other-apps-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tecvirt-other-apps',
  templateUrl: './other-apps.component.html',
  styleUrls: ['./other-apps.component.scss'],
})
export class OtherAppsComponent implements OnInit {
  appsOi: AppsOiModel[];
  iosMargin = false;
  constructor(public modalController: ModalController,
    private platform: Platform,) { }

  ngOnInit() {
    this.appsOi = APPS_OI;
    if (this.platform.is('ios')) {
      this.iosMargin = true;
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
  shouldPresentMarket() {
    return (this.platform.is('ios') || this.platform.is('android'));
  }
  openMarket(app: AppsOiModel) {  //  TODO dispatch ga
    const url = this.getLink(app);
    window.open(url, '_system');
  }
  getLink(app: AppsOiModel) {
    if (this.platform.is('ios')) {
      return app.linkIOS;
    }
    return app.linkAndroid;
  }
}
