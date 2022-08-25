/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { UtilityState } from 'src/app/states/utility.state';
import { ExternalUserState } from './../states/externalUser.state';
import { ToastService } from './toast.service';
import { getProductByIdentifier } from './../domain/product-portfolio';
import { ProductState } from './../states/product.state';
import { TECNICO_VIRTUAL_API } from './../../environments/server-urls';
import { UserState } from './../states/user.state';
import { ModalController, Platform } from '@ionic/angular';
import { UserSet, UserUnset, UserPatch } from './../actions/user.actions';
import { ExternalUserSet } from './../actions/externalUser.action';
import { Store } from '@ngxs/store';
import { ProductHelper } from './../helpers/product-helper';
import { User } from './../models/user.model';
import { tap, take, finalize, map, filter, switchMap } from 'rxjs/operators';
import { RequestProviderService } from './request-provider.service';
import { Injectable, Injector } from '@angular/core';
import { ProductCodeEnum, ProductIdentifierEnum } from '../enums/product.enum';
import { SecureStorageService } from '../core/secure-storage.service';
import { ContractSelectorComponent } from 'src/app/modals/contract-selector/contract-selector.component';
import { LocalstorageService } from './localstorage.service';
import { CleanAllTicketsAction } from '../actions/ticket.actions';
import { ProductInterface } from '../domain/product.interface';
import { ProductSet, ProductConfigSet, ProductUnset } from '../actions/product.action';
import { Router } from '@angular/router';
import { LOGIN_ERROR_PAGE_CATALOG, TOAST_LOGIN_SUCCESS, TOAST_LOGIN_ERROR } from '../modals/login/login.constants';
import { ReplaySubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AppsflyerService } from './appsflyer.service';
import { ClearHomeTickets } from '../actions/utility.actions';
import { ScreenSet } from '../actions/screen.actions';
import { RecaptchaService } from './recaptcha.service';
import { TecnologyEnum } from '../enums/tecnology.enum';
import { CobreExtraStepComponent } from '../modals/cobre-extra-step/cobre-extra-step.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public oneSignal: string;
  public userLoggedinOnProduct = new ReplaySubject<ProductInterface>(1);
  public isLoginInProgress = false;
  public needsActionContract = false;
  public changeContractFinished = false;
  constructor(
    public req: RequestProviderService,
    public store: Store,
    public modalController: ModalController,
    public platform: Platform,
    public secureStorage: SecureStorageService,
    public localStorageService: LocalstorageService,
    public router: Router,
    public injector: Injector,
    public toastService: ToastService,
    public recaptchaService: RecaptchaService
  ) {
    this.observeUserLoggedin();
  }

  login(user: User) {
    this.isLoginInProgress = true;
    const { tecnology } = this.store.selectSnapshot(ProductState.getCurrentProduct);
    const userModified = this.loginTranslator(user);
    return this.req.post(TECNICO_VIRTUAL_API.login, userModified, undefined).pipe(
      finalize(() => {
        console.log('Process login done 👍');
        this.isLoginInProgress = false;
      }),
      switchMap(usr => this.fetchConfig((usr as User))),
      map(res => {
        // responsable to hanlder login exceptions :)
        const response = {
          ...res.user,
          error: (this[`login${tecnology}`](
            {
              ...user,
              ...{ sessionUUID: uuidv4() }
            }
            , res))
        };
        return response;
      }),
      tap(res => this.resolveEventsGa(res)));
  }

  resolveEventsGa(res) {
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    // Appsflyer first login notify
    // add analytics service as soon circular depency detected
    if (res && res.isFirstLogin) {
      this.injector.get(AppsflyerService).trackEvent('login_novo', {
        produto: product.ga,
      });
    }
    return res;
  }

  observeUserLoggedin() {
    this.store.select(ProductState.getConfig)
      .pipe(
        filter(cfg => (!!cfg)),
        switchMap(_ => this.store.select(UserState.getUser).pipe(
          filter(usr => (!!usr && !!usr.authorization)),
          take(1)
        ))
      ).subscribe(res => {
        const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
        this.userLoggedinOnProduct.next(product);
      });
  }

  loginFibra(user: any, res: any) {
    const { portfolio, authorization, id, contrato, callCenterNumber, isAltaVelocidade, nomeDoPlano, contratos } = res.user as any;
    user.authorization = authorization;
    user.callCenterNumber = callCenterNumber;
    user.isHighSpeed = isAltaVelocidade;
    user.nomeDoPlano = nomeDoPlano;
    user.id = id;
    user.identifier = contrato || user.identifier;
    user.portfolio = (portfolio || []).map(code => ProductHelper.productCodeToProductIdentifier(code));
    user.contratos = contratos;
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    let errorPage;
    if (contratos && contratos.length > 1) {
      this.needsActionContract = true;
    }
    if (!user.portfolio.some(p => p === product.identifier) && !this.needsActionContract) {
      errorPage = LOGIN_ERROR_PAGE_CATALOG.invalidProduct;
    }
    this.dispatchUserAndConfig(user, res.cfg);
    return errorPage;
  }
  loginCobre(user: any, res: any) {
    this.needsActionContract = true;
    return this.defaultLogin(user, res);
  }
  loginDTH(user: any, res: any) {
    return this.defaultLogin(user, res);
  }
  defaultLogin(user: any, res: any) {
    const { authorization, id, addressData } = res.user as any;
    user.authorization = authorization;
    user.id = id;
    if (addressData) {
      user.addressData = addressData;
    }
    this.dispatchUserAndConfig(user, res.cfg);
    return undefined;
  }
  public dispatchUserAndConfig(user, config) {
    this.store.dispatch(new UserSet(user)).toPromise()
      .finally(() => {
        this.saveOnSecureStorage();
        this.store.dispatch(new ProductConfigSet(config));
      });
  }

  public fetchConfig(user?: User) {
    const { authorization } = user;
    const headers = {
      authorization
    };
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct).productCode;
    return this.req.get(`${TECNICO_VIRTUAL_API.config}?produto=${product}`, { headers })
      .pipe(
        map(cfg => {
          const mergeObj = {
            ...{ user },
            ...{ cfg }
          };
          return mergeObj;
        })
      );
  }

  saveOnSecureStorage() {
    const save = this.localStorageService.getItem('keep_me_loggedin');
    if (!!save) {
      const user = this.store.selectSnapshot(UserState.getUser);
      const usr = Object.assign({}, user);
      this.secureStorage.set(`user-${user.productCode}`, JSON.stringify(usr));
    }
  }

  /**
   *  @param component necessary to avoid circular dependency
   */
  public async loginWithForm(component, data?: {
    enableSkipLogin?: boolean,
    cpfOrCnpj?: string,
    actionButton?,
    errorReason?: string
  }) {
    this.changeContractFinished = false;
    this.needsActionContract = false;
    const modal = await this.modalController.create({
      component,
      componentProps: data,
      cssClass: 'tec-virt-reduced-modal',
      backdropDismiss: false
    });
    await modal.present();
    const result = await modal.onWillDismiss();
    if (result && result.data && result.data.loginSkiped) {
      return result;
    }
    if (data && data.errorReason || (!result || !result.data)) {
      return { data: undefined, role: undefined };
    }
    // Test if has more than one contract
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    if (product.productCode === ProductCodeEnum.FIBRA && this.needsActionContract) {
      return await this.handlerFibraExtraStep(component, result);
    }
    if (product.tecnology === TecnologyEnum.COBRE) {
      return await this.handlerCobreExtraStep(result);
    }
    return result;
  }
  private async handlerFibraExtraStep(component, result) {
    const contract = await this.handleMoreThanOneContract();
    if (!contract) {
      this.logout();
      return { data: undefined, role: undefined };
    }
    const changeResult = await this.changeContractLogin(contract, component);
    return changeResult || result;
  }
  private async handlerCobreExtraStep(result) {
    const loadingModal = await this.modalController.create({
      component: CobreExtraStepComponent,
      cssClass: 'tec-virt-reduced-modal',
    });
    await loadingModal.present();
    const { data: action } = await loadingModal.onWillDismiss();
    if (action) {
      if (action.change) {
        this.changeproductAndLogin();
        return;
      }
      this.logout();
      return { data: undefined, role: undefined };
    }
    this.needsActionContract = false;
    const user = this.store.selectSnapshot(UserState.getUser);
    this.store.dispatch(new UserSet(user));
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    this.userLoggedinOnProduct.next(product);
    return result;
  }
  public getUser() {
    return this.store.selectSnapshot(UserState.getUser);
  }

  public getIdentifier() {
    return this.store.selectSnapshot(UserState.getUser).identifier;
  }
  public getCurrentProductCode() {
    return this.store.selectSnapshot(ProductState.getCurrentProductCode);
  }
  public getCurrentProductIdentifier() {
    return this.store.selectSnapshot(ProductState.getCurrentProduct).identifier;
  }
  getUserId() {
    return this.store.selectSnapshot(UserState.getUser).id || '';
  }
  public getUserToken() {
    return this.store.selectSnapshot(UserState.getUser).authorization || '';
  }
  public isLoggedIn() {
    const { productCode } = this.store.selectSnapshot(ProductState.getCurrentProduct) || { productCode: undefined };
    const user = this.store.selectSnapshot(UserState.getUser);
    if (this.store.selectSnapshot(UtilityState.getProductToken)) {
      return user && user.productCode === productCode && !!user.authorization;
    }
    if (user.productCode === ProductCodeEnum.FIBRA) {
      return ((!this.needsActionContract || this.changeContractFinished) &&
        user && user.productCode === productCode && !!user.authorization);
    }
    if (user.productCode === ProductCodeEnum.BANDA_LARGA || user.productCode === ProductCodeEnum.FIXO) {
      return (!this.needsActionContract &&
        user && user.productCode === productCode && !!user.authorization);
    }
    return user && user.productCode === productCode && !!user.authorization;
  }
  public cpfOrCnpjIsValid(cpfOrCnpj) {
    return (cpfOrCnpj.length >= 11);
  }

  loginTranslator(user: User) {
    const userModified = {
      produto: user.productCode,
      cpf: user.cpfOrCnpj,
      captchaResponse: user.captchaResponse,
      oneSignal: this.oneSignal,
    };
    if (!this.oneSignal) {
      delete userModified.oneSignal;
    }
    const identifier = ProductHelper.getIdentifierForBackEnd(user.productCode);
    userModified[`${identifier}`] = user.identifier;
    return userModified;
  }
  logout() {
    const sub = this.req.post(TECNICO_VIRTUAL_API.logout, {}, undefined)
      .pipe(
        finalize(() => {
          const user = JSON.parse(JSON.stringify(this.store.selectSnapshot(UserState.getUser) as User));
          this.store.dispatch(new CleanAllTicketsAction());
          this.store.dispatch(new ClearHomeTickets());
          this.store.dispatch(new UserUnset(
            user
          )).toPromise().finally(() => {
            this.secureStorage.remove(`user-${user.productCode}`);
          });
        }),
        take(1)
      ).subscribe(res => {
        this.userLoggedinOnProduct.next(undefined);
        if (sub) {
          sub.unsubscribe();
        }
      });

  }
  logoutAndReturn() {
    this.logout();
    this.router.navigate(['/']);
    this.store.dispatch(new ProductUnset());
    this.store.dispatch(new ScreenSet({
      screenName: 'selecao_produto',
      contextFlow: 'selecao_produto',
    }));
  }
  async retrieveUserFromSecureStorage() {
    const usr = this.store.selectSnapshot(UserState.getUser);
    if (!usr) {
      return;
    }
    try {
      const user = await this.secureStorage.get(`user-${usr.productCode}`);
      if (!!user) {
        const userObj = JSON.parse(user);
        await this.store.dispatch(new UserPatch(userObj)).toPromise();
        const config = await this.fetchConfig(userObj).toPromise();
        const { cfg } = config;
        this.store.dispatch(new ProductConfigSet(cfg));
      }
    } catch (e) {
      //
    }
  }
  handlerExceptionsOnLogin(response: any) {
    const id = this.store.selectSnapshot(ProductState.getCurrentProduct).identifier;
    const product = getProductByIdentifier(id);
    product.handlerExceptionsOnLogin(response);
  }

  private credentialsToDispatch(portfolio: any[], product: number) {
    const returnValue = [];
    portfolio.forEach(item => {
      const user: User = {
        cpfOrCnpj: item.cpf,
        productCode: product,
        identifier: item.terminal,
        nomeDoPlano: item.descricao
      };
      returnValue.push(user);
    });
    return returnValue;
  }

  public async handlePortfolioMinhaOiDeeplink(portfolio: any, isPositivado: boolean) {
    const product: ProductInterface = JSON.parse(await this.secureStorage.get('selected-product-code'));
    this.secureStorage.remove('selected-product-code');
    const productObj = getProductByIdentifier(product.identifier);
    this.store.dispatch(new ProductSet(productObj));
    const products = [
      ProductCodeEnum.BANDA_LARGA,
      ProductCodeEnum.FIXO,
      ProductCodeEnum.TVDTH,
      ProductCodeEnum.FIBRA,
    ];

    let queryParams: {
      isPositivado?: boolean,
      portfolioPresent?: boolean,
      fromDeeplink?: boolean,
      invalidProduct?: boolean,
      needsActionContract?: boolean,
      users?: any
    } = { fromDeeplink: true };

    if (!portfolio) {
      queryParams.portfolioPresent = false;
      this.router.navigate(['home'], { queryParams });
      return;
    }
    queryParams.portfolioPresent = true;
    let payload = {};
    products.forEach(product => {
      payload[product] = this.credentialsToDispatch(portfolio[product], product);
    });
    await this.store.dispatch(new ExternalUserSet(payload)).toPromise();
    const users = payload[product.productCode];

    if (!isPositivado) {
      queryParams.isPositivado = false;
      this.router.navigate(['home'], { queryParams });
      return;
    }
    queryParams.isPositivado = true;
    if (users && users.length > 0) {
      const loginCredentials = users[0];
      queryParams.portfolioPresent = true;
      const user = { ...loginCredentials, ...{ captchaResponse: await this.secureStorage.get('captcha-token') } };
      this.login(user)
        .subscribe(result => {
          if (isPositivado) queryParams.isPositivado = true;
          if (result.error && result.error === LOGIN_ERROR_PAGE_CATALOG.invalidProduct) queryParams.invalidProduct = true;
          if (result && result.contratos && result.contratos.length > 1 || users.length > 1) {
            queryParams.needsActionContract = true;
          }
          this.needsActionContract = false;
          this.router.navigate(['home'], { queryParams });
        },
          err => {
            console.log('login.loginService.err', err);
            queryParams.isPositivado = false;
            this.router.navigate(['home'], { queryParams });
            this.toastService.presentToast(TOAST_LOGIN_ERROR);
          });
    } else {
      queryParams.portfolioPresent = false;
      this.router.navigate(['home'], { queryParams });
    }
  }

  async selectOneContract(product, portfolio, userCredentials, noMask?, minhaOi?) {
    const selectorModal = await this.modalController.create({
      component: ContractSelectorComponent,
      componentProps: { contracts: portfolio[product.productCode], noMask, minhaOi },
      cssClass: 'tec-virt-reduced-modal',
    });
    await selectorModal.present();
    const { data: contract } = await selectorModal.onWillDismiss();
    if (!contract) return null;
    return userCredentials.find(user =>
      (user.identifier || user.contrato) === (contract.terminal || contract.contrato || contract.identifier)
    );
  }

  async handleMoreThanOneContract(noMask?, minhaOi?) {
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    const userFallback = this.store.selectSnapshot(ExternalUserState.getExternalUser(product.productCode));
    const user = this.store.selectSnapshot(UserState.getUser);
    const contracts = user.contratos || userFallback;
    const portfolio = { [product.productCode]: contracts };
    const contract = await this.selectOneContract(product, portfolio, contracts, noMask, minhaOi);
    if (!contract) {
      return undefined;
    }
    const data: User = {
      cpfOrCnpj: user.cpfOrCnpj,
      identifier: contract.contrato || contract.identifier,
      captchaResponse: user.captchaResponse,
      productCode: user.productCode,
      isNovaFibra: contract.isNovaFibra || false
    };
    return data;
  }

  retakeLogin() {
    if (!this.store.selectSnapshot(ProductState.getCurrentProduct) || this.isLoginInProgress || !this.getUser().cpfOrCnpj) {
      return;
    }
    const user = Object.assign({}, this.getUser());
    delete user.authorization;
    this.recaptchaService.execute('login').subscribe(token => {
      user.captchaResponse = token;
      this.login(user).subscribe(res => {
        // login success
      }, err => {
        // err login
      });
    }, err => {
      this.logout();
      console.log(err);
    });
  }
  checkNovaFibra(cpf) {
    const options = { headers: { cpf } };
    return this.req.get(TECNICO_VIRTUAL_API.checkMundoNovo, options);
  }
  async changeContractLogin(contract, component) {
    if (contract.isNovaFibra) {
      this.loginWithForm(component, {
        errorReason: LOGIN_ERROR_PAGE_CATALOG.novaFibraIos
      });
      this.logout();
      this.changeContractFinished = true;
      return { data: { loginSuccess: false } };
    }
    try {
      this.changeContractFinished = true;
      const token = await this.recaptchaService.execute('login').toPromise();
      contract.captchaResponse = token;
      const user = await this.login(contract).toPromise();
      const portfolio = (user.portfolio || []).map(code => ProductHelper.productCodeToProductIdentifier(code));
      const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
      if (!portfolio.some(p => p === product.identifier)) {
        const errorReason = LOGIN_ERROR_PAGE_CATALOG.invalidProduct;
        this.loginWithForm(component, {
          errorReason
        });
        return { data: { loginSuccess: false } };
      }
      this.toastService.presentToast(TOAST_LOGIN_SUCCESS);
      return { data: { loginSuccess: true } };
    } catch (e) {
      this.toastService.presentToast(TOAST_LOGIN_ERROR);
      this.logout();
      console.error(e);
    }
  }
  async changeproductAndLogin() {
    const { cpfOrCnpj, identifier } = JSON.parse(JSON.stringify(this.store.selectSnapshot(UserState.getUser)));
    const user = { cpfOrCnpj, identifier, productCode: 3, captchaResponse: '' };
    this.logout();
    setTimeout(() => {
      this.needsActionContract = false;
      const productObj = getProductByIdentifier(ProductIdentifierEnum.FIBRA_BANDA_LARGA);
      this.store.dispatch(new ProductSet(
        productObj
      ));
      this.recaptchaService.execute('login').subscribe(token => {
        user.captchaResponse = token;
        this.login(user).subscribe(async res => {
          await this.toastService.presentToast(TOAST_LOGIN_SUCCESS);
        }, err => {
          this.logout();
        });
      }, err => {
        this.logout();
        console.log(err);
      });
    }, 500);
  }
}
