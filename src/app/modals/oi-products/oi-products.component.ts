import { InAppBrowserService } from './../../services/in-app-browser.service';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ProductState } from '../../states/product.state';
import { ModalController, Platform } from '@ionic/angular';
import { ProductsOiModel, getOiProduct } from './oi-products.constants';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';
import { FeatureUnset } from 'src/app/actions/feature.action';

@Component({
  selector: 'tecvirt-oi-products',
  templateUrl: './oi-products.component.html',
  styleUrls: ['./oi-products.component.scss'],
})
export class OiProductsComponent implements OnInit {
  productsOi;
  iosMargin = false;
  gaPageName = 'servicos_produtos_oi';
  constructor(public modalController: ModalController,
    private platform: Platform,
    private store: Store,
    private analyticsService: AnalyticsService,
    private iab: InAppBrowserService) { }

  ngOnInit() {
    const product = this.store.selectSnapshot(ProductState.getCurrentProductCode);
    this.productsOi = getOiProduct(product);
    if (this.platform.is('ios')) {
      this.iosMargin = true;
    }
    this.publicAnalytics();
  }
  closeModal() {
    this.store.dispatch(new FeatureUnset());
    this.modalController.dismiss();
    this.analyticsService.logEventGA('fechar', 'click');
  }
  publicAnalytics() {
    const analytics: ScreenStateModel = {
      screenName: this.gaPageName
    };
    this.store.dispatch(new ScreenSet(analytics));
  }
  onClick(product: ProductsOiModel) {
    this.dispatchGA(product);
    this.iab.goToLink(product.link);
  }
  dispatchGA(product: ProductsOiModel) {
    const gaAction = product.gaClickApp;
    this.analyticsService.logEventGA(gaAction, 'click');
  }
}
