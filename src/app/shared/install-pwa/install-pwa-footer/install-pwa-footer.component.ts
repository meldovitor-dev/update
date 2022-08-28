import { Component, AfterContentInit } from '@angular/core';
import { PwaUtilityService } from 'src/app/services/pwa-utility.service';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-install-pwa-footer',
  templateUrl: './install-pwa-footer.component.html',
  styleUrls: ['./install-pwa-footer.component.scss'],
})
export class InstallPwaFooterComponent implements AfterContentInit {

  tecvirtIcon = './assets/icon/app_icon.png';
  hasClicked = false;
  constructor(public pwaUtility: PwaUtilityService, public analitics: AnalyticsService) { }

  ngAfterContentInit() {

  }

  installPWA(e) {
    this.hasClicked = true;
    this.pwaUtility.installBanner();
    this.analitics.logEventGA('adicionar_pwa_tela_inicial', 'click');
  }

  onClick(e) {
    this.hasClicked = true;
    this.analitics.logEventGA('fechar_alerta_adicionar_pwa_tela_inicial', 'click');
    e.stopPropagation();
  }

}
