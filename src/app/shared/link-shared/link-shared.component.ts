import { InAppBrowserService } from './../../services/in-app-browser.service';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LinkCatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { NativeSettingsService } from 'src/app/services/native-settings.service';

@Component({
  selector: 'tecvirt-link-shared',
  templateUrl: './link-shared.component.html',
  styleUrls: ['./link-shared.component.scss'],
})
export class LinkSharedComponent implements OnInit {

  @Input() linkShared: LinkCatalogModel;
  @Output() linEvt = new EventEmitter<any>();
  constructor(public analyticsService: AnalyticsService,
    public iab: InAppBrowserService,
    public settingsService: NativeSettingsService) { }

  ngOnInit() { }

  onClick() {
    this.dispatchGA();
    if (this.linkShared.action && this[this.linkShared.action]) {
      this[this.linkShared.action]();
      return;
    }
    this.openIAB();
  }

  dispatchGA() {
    const { gaAction } = this.linkShared;
    this.analyticsService.logEventGA(gaAction, 'click');
  }

  openIAB() {
    this.iab.goToLink(this.linkShared.link);
  }

  openWifiSettinfgs() {
    this.settingsService.openSetting('wifi');
  }

  sendEvent() {
    this.linEvt.emit({ action: 'linkSharedEvt' });
  }

}
