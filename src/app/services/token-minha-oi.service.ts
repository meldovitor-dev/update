import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ModalController } from '@ionic/angular';
import { UtilityState } from 'src/app/states/utility.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RequestProviderService } from './request-provider.service';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';
import { ProductState } from '../states/product.state';
import { SecureStorageService } from '../core/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenMinhaOiService {

  token: string;
  error = new BehaviorSubject(false);
  constructor(private store: Store,
    public modalController: ModalController,
    public req: RequestProviderService,
    public loginService: LoginService,
    private secureStorage: SecureStorageService,
  ) { }

  checkTokenLogin(): boolean {
    this.token = this.store.selectSnapshot(UtilityState.getMinhaOiToken);
    return !!this.token;
  }
  async handleTokenLogin() {
    const token = this.token;
    const options = { headers: { token } };
    this.req.post(TECNICO_VIRTUAL_API.tokenDeeplink, {}, options).subscribe(async (res: any) => {
      if (!res) {
        this.error.next(true);
        return;
      }
      const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
      if (!res.portfolio || !res.portfolio[product.productCode].length) {
        this.error.next(true);
        return;
      }
      await this.secureStorage.set(
        'selected-product-code',
        JSON.stringify(product)
      );
      this.modalController.dismiss();
      this.loginService.handlePortfolioMinhaOiDeeplink(res.portfolio, true);
    }, err => {
      console.error(err);
      this.error.next(true);
      return;
    });
  }
}
