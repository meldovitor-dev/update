import { TokenMinhaOiService } from './../../services/token-minha-oi.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from 'src/app/states/product.state';
import { Observable } from 'rxjs';
import { ProductInterface } from 'src/app/domain/product.interface';
import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { LOGIN_ERROR_PAGE_CATALOG, GET_LOGIN_ERROR_PAGE } from '../login/login.constants';
import { ScreenSet } from 'src/app/actions/screen.actions';
import { ProductUnset } from 'src/app/actions/product.action';
import { SubSink } from 'subsink';

@Component({
  selector: 'tecvirt-moi-token',
  templateUrl: './moi-token.component.html',
  styleUrls: ['./moi-token.component.scss']
})
export class MoiTokenComponent implements OnInit {
  errorPage = GET_LOGIN_ERROR_PAGE(LOGIN_ERROR_PAGE_CATALOG.noPortfolio);
  screenName = 'realizando_login_deeplink_minha_oi';
  flow = 'deeplink_minha_oi';
  sub = new SubSink();
  @Select(ProductState.getCurrentProduct) selectedProduct: Observable<ProductInterface>;
  constructor(public modalController: ModalController,
    public tokenService: TokenMinhaOiService,
    public store: Store
  ) { }

  ngOnInit() {
    this.tokenService.handleTokenLogin();
    this.store.dispatch(new ScreenSet({
      screenName: this.screenName,
      contextFlow: this.flow
    }));
    this.sub.sink = this.tokenService.error.subscribe(res => {
      if (res) {
        this.dispatchErrorScreenView()
      }
    });
  }
  dismiss(btn?) {
    this.modalController.dismiss({ cancel: true });
    this.tokenService.error.next(false);
    this.store.dispatch(new ProductUnset());
    this.store.dispatch(new ScreenSet({
      screenName: 'selecao_produto',
      contextFlow: 'selecao_produto',
    }));
    this.sub.unsubscribe();
  }
  sanitize(product) {
    if (product && product.productCode === ProductCodeEnum.FIBRA) {
      return 'Fibra';
    }
    return product ? product.displayName : '';
  }
  dispatchErrorScreenView() {
    this.store.dispatch(new ScreenSet({
      screenName: this.errorPage.gaPageName,
    }));
  }
}
