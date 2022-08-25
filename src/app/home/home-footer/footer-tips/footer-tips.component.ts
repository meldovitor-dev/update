import { InAppBrowserService } from './../../../services/in-app-browser.service';
import { Component, OnInit } from '@angular/core';
import { TipsService } from 'src/app/services/tips.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-footer-tips',
  templateUrl: './footer-tips.component.html',
  styleUrls: ['./footer-tips.component.scss'],
})
export class FooterTipsComponent implements OnInit {
  slideOpts = {
    loop: true,
    autoplay: {
      delay: 6000,
    }
  };
  constructor(
    public tipsService: TipsService,
    public iab: InAppBrowserService) { }

  ngOnInit() {
    this.tipsService.init();
  }

  onClick(link) {
    this.iab.goToLink(link);
  }
}
