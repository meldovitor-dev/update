/* eslint-disable @typescript-eslint/member-ordering */
import { PRIVACY_FOOTER_LABEL } from './product-portfolio.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductSet } from './../actions/product.action';
import { Store } from '@ngxs/store';
import { Component, OnInit, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { getProductByIdentifier } from '../domain/product-portfolio';
import { AnalyticsService } from '../core/analytics.service';
import { LocalstorageService } from '../services/localstorage.service';
import { Platform, ModalController } from '@ionic/angular';
import { SplashscreenService } from '../services/splashscreen.service';
import { SubSink } from 'subsink';
import { AddMinhaOiToken } from '../actions/utility.actions';
import { GetPortfolioComponent } from '../modals/get-portfolio-modal/get-portfolio-modal.component';
import { ProductCodeEnum } from '../enums/product.enum';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tecvirt-product-portfolio',
    templateUrl: './product-portfolio.component.html',
    styleUrls: ['./product-portfolio.component.scss']
})
export class ProductPortfolioComponent implements OnInit, OnDestroy {
    gaPageName = 'selecao_produto';
    loading = true;
    subs = new SubSink();
    public openSubProducts = false;
    privacyFooter = PRIVACY_FOOTER_LABEL;
    hasFibra = false;
    @ViewChild('fibraOffer', { static: false }) fibraOffer;
    constructor(
      public store: Store,
      public router: Router,
      public analyticsService: AnalyticsService,
      public localstorageService: LocalstorageService,
      public platform: Platform,
      public sc: SplashscreenService,
      public route: ActivatedRoute,
      public modalController: ModalController,
    ) { }

    ngOnInit() {
        this.subs.sink = this.route.params.subscribe(async ( _ ) => {
            if (!this.platform.is('hybrid')) {
                this.loading = false;
                this.sc.hide();
                return;
            }
            if (!this.localstorageService.getItem('firstAccess')) {
                this.router.navigate(['wizard']);
                return;
            }
            this.loading = false;
            this.sc.hide();
        });
        this.subs.sink = this.route.queryParams.subscribe(res => {
          if (res.token) {
            const { token } = res;
            this.store.dispatch(new AddMinhaOiToken({token}));
          }
        });
    }

    productSelect(product) {
        const { identifier } = product;
        if (!identifier) {
            return;
        }
        const productObj = getProductByIdentifier(identifier);
        this.store.dispatch(new ProductSet(
            productObj
            ));
        this.publishEvent(productObj);
        this.router.navigate(['home']);
    }
    publishEvent(product) {
        const { ga } = product || { ga: ''};
        if (ga) {
            this.analyticsService.logEventGA(ga, 'click');
        }
    }
    fibraOfferView() {
        this.fibraOffer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    updateBanner(hasFibra) {
      this.hasFibra = hasFibra;
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
