import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-oi-expert-banner',
  templateUrl: './oi-expert-banner.component.html',
  styleUrls: ['./oi-expert-banner.component.scss']
})
export class OiExpertBannerComponent implements OnInit {
  screenWidth:any;
  screenHeight:any;
  expertNovaOi ='./assets/icon/oi_expertnovaoi.png';
  expertLogo = './assets/icon/oi-expertlogo.svg';
  constructor(
    private iab: InAppBrowser,
    private analyticsService: AnalyticsService,
  ) { 
  }

  ngOnInit() {
  }
  goToOiExpert(){
    const ga = 'eu_quero_oi_expert'
    this.analyticsService.logEventGA(ga, 'click');
    this.iab.create('https://bit.ly/oi_sva7')
  }
}
