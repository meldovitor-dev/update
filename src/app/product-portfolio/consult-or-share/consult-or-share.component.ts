import { InAppBrowserService } from './../../services/in-app-browser.service';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-consult-or-share',
  templateUrl: './consult-or-share.component.html',
  styleUrls: ['./consult-or-share.component.scss'],
})
export class ConsultOrShareComponent implements OnInit {

  showSharedButton = true;
  constructor(private inAppBrowser: InAppBrowserService,
    private platform: Platform,
    private analyticsService: AnalyticsService) { }

  ngOnInit() {
    if (!this.platform.is('hybrid')) {
      this.showSharedButton = false;
    }
  }
  checkAvailability() {
    this.analyticsService.logEventGA('consultar_disponibilidade_fibra', 'click');
    this.inAppBrowser.goToOiFibraStore();
  }
}
