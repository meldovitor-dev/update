import { AnalyticsService } from './../../../core/analytics.service';
import { Component, AfterContentInit } from '@angular/core';
import { PwaUtilityService } from 'src/app/services/pwa-utility.service';

@Component({
  selector: 'tecvirt-install-pwa-button',
  templateUrl: './install-pwa-button.component.html',
  styleUrls: ['./install-pwa-button.component.scss'],
})
export class InstallPwaButtonComponent implements AfterContentInit {

  constructor(public pwaUtility: PwaUtilityService,
    public analitics: AnalyticsService) { }

  ngAfterContentInit() {

  }

  installPWA(e) {
    this.analitics.logEventGA('adicionar_pwa_tela_inicial', 'click');
    this.pwaUtility.installBanner();
  }

}
