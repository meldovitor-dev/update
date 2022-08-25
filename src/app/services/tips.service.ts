/* eslint-disable max-len */
import { BANDA_LARGA_TIPS, FIBRA_FIXO_TIPS, FIBRA_TV_TIPS, FIBRA_INTERNET_TIPS, FOOTER_INFO, COBRE_FIXO_TIPS, TV_TIPS } from './../home/home-footer/tips-catalog';
import { ProductIdentifierEnum } from './../enums/product.enum';
import { ProductState } from 'src/app/states/product.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TipsService {

  public currentProduct;
  constructor(private store: Store) {
  }
  init() {
    this.store.select(ProductState.getCurrentProduct).subscribe(product => {
      this.currentProduct = product;
    });
  }
  getTips() {
    if (!this.currentProduct) {
      return [];
    }
    const identifier = this.currentProduct.identifier;
    const tips = {
      [ProductIdentifierEnum.BANDA_LARGA]: BANDA_LARGA_TIPS,
      [ProductIdentifierEnum.FIXO]: COBRE_FIXO_TIPS,
      [ProductIdentifierEnum.TVDTH]: TV_TIPS,
      [ProductIdentifierEnum.FIBRA_BANDA_LARGA]: FIBRA_INTERNET_TIPS,
      [ProductIdentifierEnum.FIBRA_FIXO]: FIBRA_FIXO_TIPS,
      [ProductIdentifierEnum.FIBRA_TV]: FIBRA_TV_TIPS,
    };
    const tipArray = tips[identifier] || [];
    return tipArray;
  }
}
