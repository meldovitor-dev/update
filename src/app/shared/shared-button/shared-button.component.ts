import { SocialShareService } from './../../services/social-share.service';
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'tecvirt-shared-button',
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss'],
})
export class SharedButtonComponent implements OnInit {

  showSharedButton = true;
  constructor(
    private shareService: SocialShareService,
    private analyticsService: AnalyticsService,
    private platform: Platform,
  ) { }

  ngOnInit() {
    if (!this.platform.is('hybrid')) {
      this.showSharedButton = false;
    }
  }
  shareAPP() {
    this.analyticsService.logEventGA('compartilhar_app', 'click');
    this.shareService.shareIt();
  }

}
