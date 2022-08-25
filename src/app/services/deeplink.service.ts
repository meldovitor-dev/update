/* eslint-disable jsdoc/newline-after-description */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable jsdoc/no-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { User } from 'src/app/models/user.model';
import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { UserState } from 'src/app/states/user.state';
import { UtilityState } from './../states/utility.state';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginService } from './login.service';
import parse from 'url-parse';
import { AnalyticsService } from '../core/analytics.service';
import { ScreenSet } from '../actions/screen.actions';
import { getProductByIdentifier } from '../domain/product-portfolio';
import { ProductHelper } from '../helpers/product-helper';
import { ProductSet } from '../actions/product.action';
import { take, finalize } from 'rxjs/operators';
import { AddProductToken, AddUrlParams } from '../actions/utility.actions';
import { TOAST_LOGIN_SUCCESS } from '../modals/login/login.constants';
import { TecnologyEnum } from '../enums/tecnology.enum';
import { RequestProviderService } from './request-provider.service';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';

const routers = {
  LOGIN_MINHA_OI: '/login-minha-oi',
  FALHA_MASSIVA: '/falha-massiva',
  TRADICIONAL: '/login-tradicional',
  TOKEN: '/token'
};

@Injectable({
  providedIn: 'root'
})
export class DeeplinkService {

  constructor(
    private loginService: LoginService,
    private logg: AnalyticsService,
    private store: Store,
    private router: Router,
    private toastService: ToastService,
    public req: RequestProviderService
  ) { }

  private getUrlData(url: string): any {
    const data = parse(url);
    const returnValue = {
      protocol: data.protocol,
      domain: data.host,
      path: data.pathname,
      queryParams: {},
    };
    if (!data.query) {
      return returnValue;
    }
    const paramReceived = data.query.split('&').filter((item) => item.indexOf('payload') > -1);
    if (paramReceived.length > 0) {
      returnValue.queryParams = JSON.parse(decodeURIComponent(paramReceived[0].split('=')[1]));
    }
    return returnValue;
  }
  public async handlerDeeplink(url: string) {
    const data = this.getUrlData(url);
    const params = this.store.selectSnapshot(UtilityState.getUrlParams);
    await this.router.navigate(['deeplink-catalog']);
    if (data.path === routers.FALHA_MASSIVA) {
      this.handlerConclusaoFalhaMassiva(data);
      return true;
    }
    if (data.path === routers.TRADICIONAL) {
      this.handlerLoginTradicional(data);
      return true;
    }
    if (data.queryParams && data.queryParams.prodtoken) {
      this.handlerloginProdToken(data);
      return true;
    }
    if (data.path === routers.TOKEN || (data.queryParams && data.queryParams.token)) {
      this.handlerLoginToken(data);
      return true;
    }
    if (data.path === routers.LOGIN_MINHA_OI || (params && params.payload)) {
      this.handlerLoginMinhaOi(data);
      return true;
    }
    this.resolveDeepLinkError();
    return false;
  }
  handlerLoginMinhaOi(data) {
    this.loginService.handlePortfolioMinhaOiDeeplink(data.queryParams.portfolio, data.queryParams.isPositivado);
    this.store.dispatch(new ScreenSet({
      screenName: 'login_minha_oi',
    }));
    this.logg.logEventGA('login', 'sucesso');
  }
  handlerConclusaoFalhaMassiva(data) {
    this.doLogin(data).pipe(take(1), finalize(() => {
      this.resolveNavigation();
    })).subscribe((result) => {
      console.log('succesfully logged in', result);
    }, err => {
      this.resolveDeepLinkError(err);
      this.router.navigate(['/home']);
    });
  }
  handlerLoginTradicional(data) {
    this.doLogin(data).pipe(take(1)).subscribe(async (result) => {
      console.log('succesfully logged in', result);
      const user = this.store.selectSnapshot(UserState.getUser);
      this.router.navigate(['/home']);
      if (user.productCode === ProductCodeEnum.FIBRA && user.contratos && user.contratos.length > 1) {
        await this.handleFibraLogin(user);
        return;
      }
      this.toastService.presentToast(TOAST_LOGIN_SUCCESS);
    }, err => {
      this.resolveDeepLinkError(err);
      this.router.navigate(['/home']);
    });
  }
  handlerLoginToken(data) {
    const { queryParams } = data;
    const { token } = queryParams;
    this.router.navigate(['/'], { queryParams });
  }
  /**
   * handlerloginProdToken
   * @param {object} data - dados da URL do PWA
   * Função que faz o chama a endpoint do deeplink-produto e depois faz o login do usuario
   */
  async handlerloginProdToken(data) {
    const { queryParams } = data;
    const { prodtoken } = queryParams;  // recupero o token dos parametros passados na URL
    this.store.dispatch(new AddProductToken({ prodtoken }));  //  Salvo o token no store
    const headers = { token: prodtoken };
    await this.router.navigate(['deeplink-catalog']); //  Navego para uma tela de loading enquanto todas as chamadas são feitas
    try {
      const contract = await this.req.post(TECNICO_VIRTUAL_API.tokenProdutoLogin, {}, { headers }).pipe(take(1)).toPromise();
      this.handlerLoginTradicional({ queryParams: contract });
    } catch (e) {
      console.log('🤖 Error Token Login', e);
      this.router.navigate(['']);
    }
  }

  doLogin(data) {
    const { queryParams } = data;
    let produto = isNaN(queryParams.product) ? queryParams.produto : queryParams.product;
    const productObj = getProductByIdentifier(ProductHelper.productCodeToProductIdentifier(produto));
    if (productObj.tecnology === TecnologyEnum.FIBRA) {
      produto = ProductCodeEnum.FIBRA;
    }
    const user = {
      cpfOrCnpj: queryParams.cpf,
      identifier: queryParams.terminal,
      productCode: produto,
    };
    this.store.dispatch(new ProductSet(
      productObj
    ));
    return this.loginService.login(user);
  }
  async handleFibraLogin(user: User) {
    const contract = await this.loginService.handleMoreThanOneContract();
    const component = LoginComponent;
    await this.loginService.changeContractLogin(contract, component);
  }

  resolveDeepLinkError(err?) {
    if (err) {console.log('login deeplink error', err);}
    console.log('error deeplink');
  }
  resolveNavigation() {
    const auth = this.store.selectSnapshot(UserState.getUser).authorization;
    if (auth) {
      this.router.navigate(['deeplink-catalog/conclusao-falha-massiva']);
      return;
    }
    this.resolveDeepLinkError();
  }

  public initializeURLParams(location) {
    if (!location) {
      return;
    }
    const { search } = location;
    const hasParams = /\?(.+?\=.+){1}/;
    if (search && hasParams.test(search)) {
      const params = {};
      search.split('?')[1].split('&').forEach(el => {
        const property = el.split('=');
        if (property.length > 0) {
          params[property[0]] = property[1].replace(/%22/g, '');
        }
      });
      this.dispatchParams(params);
    }
  }
  public dispatchParams(urlParams) {
    this.store.dispatch(new AddUrlParams(urlParams));
  }
}
