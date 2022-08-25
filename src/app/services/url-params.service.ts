import { UtilityState } from 'src/app/states/utility.state';
import { ProductState } from 'src/app/states/product.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CatalogPrefix } from '../enums/catalog.enum';

@Injectable({
  providedIn: 'root'
})
export class UrlParamsService {

  private urlParams;
  constructor(private store: Store) {
  }
  getUrlParms() {
    this.urlParams = this.store.selectSnapshot(UtilityState.getUrlParams);
  }
  urlParamsCheck(key, value): boolean {
    this.getUrlParms();
    return !!(this.urlParams && this.urlParams[key] && this.urlParams[key] === value);
  }
  isVoicenet(): boolean {
    return this.urlParamsCheck('utm_source', 'oisolucoes') &&
      this.urlParamsCheck('productDescription', 'voicenet');
  }
  getVoicenetCatalog() {
    const catalog = {
      name: 'voicenet',
      initialPage: CatalogPrefix.VOICENET + 0
    };
    return catalog;
  }
}
