import { LoginService } from './../../services/login.service';
import { FibraOfferComponent } from './../../modals/fibra-offer/fibra-offer.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductState } from 'src/app/states/product.state';
import { filter, take } from 'rxjs/operators';
import { ProductCodeEnum } from 'src/app/enums/product.enum';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-home-fibra-offer',
  templateUrl: './home-fibra-offer.component.html',
  styleUrls: ['./home-fibra-offer.component.scss'],
})
export class HomeFibraOfferComponent implements OnInit {
  public constructComponent = false;
  constructor( private modalController: ModalController,
               private store: Store,
               private loginService: LoginService) { }

  ngOnInit() {
      this.store.select(ProductState).pipe(
        filter(state => !!state && !!state.product),
      ).subscribe(state => {
        const { product } = state;
        if (product.productCode !== ProductCodeEnum.FIXO || !this.loginService.isLoggedIn()) {
          this.constructComponent = false;
          return;
        }
        this.constructComponent = true;
      });
  }
  async checkAvailability() {
    const modal = await this.modalController.create({
      component: FibraOfferComponent,
      cssClass: 'tec-virt-reduced-modal',
      backdropDismiss: true,
    });
    await modal.present();
  }
}
