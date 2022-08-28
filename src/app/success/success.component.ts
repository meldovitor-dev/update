import { AnalyticsService } from './../core/analytics.service';
import { UserState } from './../states/user.state';
import { ProductState } from './../states/product.state';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { AppRateComponent } from '../shared/app-rate/app-rate.component';
import { LocalstorageService } from '../services/localstorage.service';
import { of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ProductIdentifierEnum } from '../enums/product.enum';
import { FibraOfferComponent } from '../modals/fibra-offer/fibra-offer.component';
import { LocationAction } from '../actions/location.actions';
import { ScreenStateModel, ScreenSet } from '../actions/screen.actions';

@Component({
  selector: 'tecvirt-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {

  shouldPresentAppRating = false;
  shouldPresentFeedback = true;
  constructor(
    public router: Router,
    public modalController: ModalController,
    public store: Store,
    public lStorage: LocalstorageService,
    public platform: Platform,
    public analyticsService: AnalyticsService) { }

  ngOnInit() {
    const analytics: ScreenStateModel = {
      screenName: 'sucesso',
    };
    this.store.dispatch(new ScreenSet(analytics));
    this.store.dispatch(new LocationAction('success'));
    this.shouldPresentAppRating = !this.lStorage.getItem('ar');
    this.shouldPresentFeedback = !this.lStorage.getItem('fr');
    if (this.shouldPresentAppRating) {
      this.verifyAndPresentRateApp();
    }
    if (this.shouldPresentFeedback) {
      this.verifyAndPresentFeedback();
    }
    this.verifyAndPresentFibraOffer();
  }
  onClick(evt?) {
    this.router.navigate(['home']);
    this.analyticsService.logEventGA('voltar_inicio', 'click');
  }
  checkIfShouldPresentFibraOffer() {
    return (
      this.store.selectSnapshot(ProductState.getCurrentProduct).identifier === ProductIdentifierEnum.FIXO &&
      !!this.store.selectSnapshot(UserState.getUser).authorization &&
      !this.shouldPresentAppRating &&
      !this.lStorage.getItem('fo'));
  }
  async verifyAndPresentRateApp() {
    if (!this.shouldPresentAppRating) {
      return;
    }
    if (!this.platform.is('hybrid')) {
      return;
    }
    const modal = await this.modalController.create({
      component: AppRateComponent,
      cssClass: 'tec-virt-reduced-modal'
    });
    const sub = of({}).pipe(
      delay(2000),
      take(1),
    ).subscribe(async res => {
      await modal.present();
      sub.unsubscribe();
    });
  }
  verifyAndPresentFeedback() {
    console.log('plataforma é hibrida: ', this.platform.is('hybrid'));
    if (this.platform.is('hybrid')) {
      this.shouldPresentFeedback = false;
      return;
    }
  }
  async verifyAndPresentFibraOffer() {
    if (!this.checkIfShouldPresentFibraOffer()) {
      return;
    }
    const modal = await this.modalController.create({
      component: FibraOfferComponent,
      cssClass: 'tec-virt-reduced-modal',
      backdropDismiss: true,
    });
    const sub = of({}).pipe(
      delay(2000),
      take(1),
    ).subscribe(async res => {
      await modal.present();
      sub.unsubscribe();
    });
  }

  closeFeedback() {
    const mediaQuery = window.matchMedia('(min-width: 600px)');
    let timeout = 0;
    if (mediaQuery.matches) {
      timeout = 300;
    }
    setTimeout(() => {
      this.shouldPresentFeedback = false;
    }, timeout);
    const analytics: ScreenStateModel = {
      screenName: 'sucesso',
    };
    this.store.dispatch(new ScreenSet(analytics));
  }

}
