import { Component, OnInit } from '@angular/core';
import { APPRATE } from './app-rate.constants';
import { ModalController, Platform } from '@ionic/angular';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';

@Component({
    selector: 'tecvirt-app-rate',
    templateUrl: './app-rate.component.html',
    styleUrls: ['./app-rate.component.scss']
})
export class AppRateComponent implements OnInit {
    appRateConfig = APPRATE;
    constructor(
        private modal: ModalController,
        private lstorage: LocalstorageService,
        private platform: Platform,
        private iab: InAppBrowserService
        ) { }

    ngOnInit() {
    }
    public rateThisApp(): void {
        if (this.platform.is('ios')) {
            this.iab.createInAppBrowser(this.appRateConfig.PLUGIN_PREFERENCES.storeAppURL.ios);
            return;
        }
        window.open(this.appRateConfig.PLUGIN_PREFERENCES.storeAppURL.android, '_system');
    }
    resolveStorage(action) {
        if (action !== this.appRateConfig.USER_ACTIONS.NOT_NOW) {
            this.lstorage.setItem('ar', true);
        }
    }
    handleButtonClicked(evt) {
        this.resolveStorage(evt);
        if (evt === this.appRateConfig.USER_ACTIONS.RATE_NOW) {
            this.rateThisApp();
        }
        this.modal.dismiss();
    }

}
