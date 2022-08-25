import { Store } from '@ngxs/store';
import { ProductHelper } from './../helpers/product-helper';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ProductState } from '../states/product.state';

const MINHA_OI = 'https://m.oi.com.br/Portal/login';
const OI_MAIS_EMPRESAS = 'https://www.oi.com.br/empresas/area-do-cliente';
const OI_FIBRA_STORE_APP: string = 'https://minha.oi.com.br/minhaoi/vendas/turbine-internet?' +
  'origem=tecnico-virtual-app&utm_source=tecnico-virtual&utm_medium=app&utm_campaign=na';
const OI_FIBRA_STORE_WEB: string = 'https://minha.oi.com.br/minhaoi/vendas/turbine-internet?' +
  'origem=tecnico-virtual-web&utm_source=tecnico-virtual&utm_medium=app&utm_campaign=na';
const OI_SOLUCOES = 'https://portaloisolucoes.oi.com.br/login/';
const MIGRACAO_FIBRA_APP: string = 'https://minha.oi.com.br/minhaoi/vendas/turbine-internet?' +
  'origem=tecnico-virtual-app-ave&utm_source=tecnico-virtual&utm_medium=app&utm_campaign=na';
const MIGRACAO_FIBRA_WEB: string = 'https://minha.oi.com.br/minhaoi/vendas/turbine-internet?' +
  'origem=tecnico-virtual-web-ave&utm_source=tecnico-virtual&utm_medium=web&utm_campaign=na';

@Injectable({
  providedIn: 'root'
})
export class InAppBrowserService {

  constructor(
    private platform: Platform,
    private iab: InAppBrowser,
    private store: Store,
  ) { }

  public createInAppBrowser(url: string, customTarget?: string, customOptions?): void {
    let target = '_system';
    if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      target = customTarget || '_self';
    }
    const options: InAppBrowserOptions = customOptions || {
      clearcache: 'yes',
      clearsessioncache: 'yes',
      cleardata: 'yes'
    };
    return this.iab.create(url, target, options).show();
  }
  public goToMinhaOi() {
    // TODO log
    return this.createInAppBrowser(MINHA_OI, '_blank');
  }
  public goToOiSolucoes() {
    // TODO log
    return this.createInAppBrowser(OI_SOLUCOES, '_blank');
  }
  public goToJoice() {
    const config = this.store.selectSnapshot(ProductState.getConfig);
    const link = ProductHelper.extractConfigValue(config, 'joice.link');
    if (!link) {
      console.log('no link provider to go to joice');
    }
    // TODO log
    return this.createInAppBrowser(link, '_blank');
  }

  public goToOiFibraStore() {
    let storeUrl = OI_FIBRA_STORE_APP;
    if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      storeUrl = OI_FIBRA_STORE_WEB;
    }
    // TODO log
    return this.createInAppBrowser(storeUrl, '_blank');
  }

  public goToOiMaisEmpresas() {
    // TODO log
    return this.createInAppBrowser(OI_MAIS_EMPRESAS, '_blank');
  }

  public goToMigracaoFibra() {
    let storeUrl = MIGRACAO_FIBRA_APP;
    if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      storeUrl = MIGRACAO_FIBRA_WEB;
    }
    // TODO log
    return this.createInAppBrowser(storeUrl, '_blank');
  }

  public goToLink(link: string) {
    return this.createInAppBrowser(link, '_blank');
  }
}
