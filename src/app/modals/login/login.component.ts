import { ConnectionState } from './../../states/connection.state';
import { TecnologyEnum } from 'src/app/enums/tecnology.enum';
import { ToastService } from './../../services/toast.service';
import { GeneralHelper } from './../../helpers/general.helper';
import { LoginService } from './../../services/login.service';
import { User } from './../../models/user.model';
import { UserState } from './../../states/user.state';
import { Store } from '@ngxs/store';
import { FormControl } from '@angular/forms';
import {
  GET_LOGIN_STEPS,
  GET_LOGIN_ERROR_PAGE,
  LOGIN_ERROR_PAGE_CATALOG,
  LoginStepsModel,
  TOAST_LOGIN_SUCCESS,
} from './login.constants';
import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { finalize, takeUntil } from 'rxjs/operators';
import { ValidationHelper } from 'src/app/helpers/validation.helper';
import { InAppBrowserService } from '../../services/in-app-browser.service';
import { ProductState } from 'src/app/states/product.state';
import { SecureStorageService } from 'src/app/core/secure-storage.service';
import { RecaptchaService } from 'src/app/services/recaptcha.service';
import { Platform } from '@ionic/angular';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';
import { ProductInterface } from 'src/app/domain/product.interface';
import { ProductHelper } from 'src/app/helpers/product-helper';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { timer } from 'rxjs';
import { ScreenState } from 'src/app/states/screen.state';
@Component({
  selector: 'tecvirt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterContentInit {
  loading = false;
  result = false;
  hasDealtError = false;
  subscriptions = [];
  currentStep;
  useTermsNotAccepted = true;
  product: ProductInterface;
  @Input() enableSkipLogin = false;
  @Input() cpfOrCnpj?: string;
  @Input() actionButton?;
  @Input() errorReason: string;
  public user: User = {};
  public loginSteps: LoginStepsModel;
  cpfOrCnpjFormControl = new FormControl('');
  identifierFormControl = new FormControl('');
  loadingButton = false;

  constructor(
    public store: Store,
    public loginService: LoginService,
    public modalController: ModalController,
    private recaptchaService: RecaptchaService,
    private iab: InAppBrowserService,
    private secureStorage: SecureStorageService,
    private platform: Platform,
    private logg: AnalyticsService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    this.refreshUserObj();
    this.loginSteps = GET_LOGIN_STEPS(this.user.productCode);
    this.cpfOrCnpjFormControl.setValue(this.user.cpfOrCnpj || '');
    this.identifierFormControl.setValue(this.user.identifier || '');
    this.automaticFillFields();
    this.handleErrorPage() || this.setCurrentPage(this.loginSteps.cpfOrCnpj);
  }
  public ngAfterContentInit(): void {
    if (this.cpfOrCnpj) {
      this.cpfOrCnpjFormControl.setValue(this.cpfOrCnpj);
      this.dispatchDataAndForward({});
    }
    this.handleErrorPage();
  }
  public async goToIdentifierStep() {
    this.setCurrentPage(this.loginSteps.identifier);
  }
  public async goToCpfOrCnpjStep() {
    this.setCurrentPage(this.loginSteps.cpfOrCnpj);
  }
  private handleErrorPage() {
    if (this.errorReason && !this.hasDealtError) {
      try {
        this.hasDealtError = true;
        this.setCurrentPage(
          GET_LOGIN_ERROR_PAGE(LOGIN_ERROR_PAGE_CATALOG[this.errorReason])
        );
      } catch (e) {
        // not valid error page
        console.error('login.component - ngAfterContentInit', e);
      }
    }
    return this.errorReason;
  }
  public automaticFillFields() {
    this.secureStorage
      .get('aui')
      .then((res) => {
        let cpfOrCnpjStorage = '';
        let identifierStorage = '';
        if (!res || !res.match(/^\[.*\]$/g)) {
          return;
        }
        const userInfo = (JSON.parse(res) || []).find(
          (el) => el.productCode === this.user.productCode
        );
        if (!userInfo) {
          return;
        }
        cpfOrCnpjStorage = userInfo.cpfOrCnpj ? userInfo.cpfOrCnpj : '';
        identifierStorage = userInfo.identifier ? userInfo.identifier : '';
        this.cpfOrCnpjFormControl.setValue(
          this.cpfOrCnpjFormControl.value
            ? this.cpfOrCnpjFormControl.value
            : cpfOrCnpjStorage
        );
        this.identifierFormControl.setValue(
          this.identifierFormControl.value
            ? this.identifierFormControl.value
            : identifierStorage
        );
      })
      .catch((e) => {
        console.error('login.component - automaticFillFields' + e);
      });
  }
  public async setUserInfoStorage(data) {
    let userfromStorage = [];
    await this.secureStorage.get('aui').then((res) => {
      if (res.match(/^\[.*\]$/g)) {
        userfromStorage = JSON.parse(res);
      }
    });
    userfromStorage = userfromStorage.filter(
      (el) => el.productCode !== this.user.productCode
    );
    userfromStorage.push(data);
    await this.secureStorage.set('aui', JSON.stringify(userfromStorage));
  }
  useTermsUpdated(evt) {
    this.useTermsNotAccepted = !evt;
  }
  dismiss(data?: any) {
    const { contextFlow } = this.store.selectSnapshot(ScreenState.getScreen);
    if (contextFlow != 'selecao_produto') {
      // NECESSARIO, para resolver atualizar o screenname da home
      this.store.dispatch(
        new ScreenSet({
          screenName: 'home',
          contextFlow: 'home',
        })
      );
    }
    if (typeof data === 'object' && Object.keys(data).length === 0) {
      data = undefined;
    }
    this.modalController.dismiss(data).finally(() => {
      this.loading = false;
      this.subscriptions.forEach((el) => {
        if (el) {
          el.unsubscribe();
        }
      });
    });
  }

  logoutAndDismiss(data?: any) {
    const isLoggedIn = !!this.store.selectSnapshot(UserState.getUser)
      .authorization;
    if (isLoggedIn) {
      this.loginService.logout();
    }
    this.dismiss(data);
  }

  refreshUserObj() {
    this.user = this.store.selectSnapshot(UserState.getUser);
  }
  onClick(btn) {
    const { action } = btn;
    this.navAction(action);
  }
  isDisabled(step) {
    const { disabled, cpfOrCnpjForm, identifierForm } = step;
    if (cpfOrCnpjForm) {
      const num = GeneralHelper.onlyNumbers(this.cpfOrCnpjFormControl.value);
      const size = `${num}`.length;
      const test = size < 11 || size > 14;
      if (step.type === 'invalidData' || step.type === 'unavailable') {
        return test;
      }
      return test || this.useTermsNotAccepted;
    }
    if (identifierForm) {
      const num = GeneralHelper.onlyNumbers(this.identifierFormControl.value);
      const size = `${num}`.length;
      return ProductHelper.isCobre(this.product.productCode)
        ? size < 10 || size > 11
        : size < 3;
    }
    return disabled;
  }
  navAction(action) {
    if (action) {
      this[action.call](action.params);
    }
  }

  public async dispatchDataAndForward(params) {
    const { action } = params;
    if (action) {
      this.navAction(action);
      return;
    }
    await this.goToIdentifierStep();
  }
  async login() {
    const { connected } = this.store.selectSnapshot(
      ConnectionState.getConnection
    );
    if (!connected) {
      this.setCurrentPage(
        GET_LOGIN_ERROR_PAGE(LOGIN_ERROR_PAGE_CATALOG.offline)
      );
      return;
    }
    this.refreshUserObj();
    const { productCode } = this.user;
    this.loading = true;
    this.result = false;
    // console.log('login.recaptchaService.inicio', this.user);
    this.subscriptions.push(
      this.recaptchaService.execute('login').subscribe(
        (token) => {
          // console.log('login.recaptchaService.token', token);
          const data: User = {
            cpfOrCnpj: GeneralHelper.onlyNumbers(
              this.cpfOrCnpjFormControl.value
            ),
            identifier: GeneralHelper.onlyNumbers(
              this.identifierFormControl.value
            ),
            captchaResponse: token,
            productCode,
          };
          this.loading = true;
          const timeout$ = timer(60000);
          this.loginService
            .login(data)
            .pipe(
              takeUntil(timeout$),
              finalize(() => {
                this.resolveLoginTimeout();
                this.loading = false;
                this.logg.logEventGA('logar', 'click');
                console.log('finalize login component');
              })
            )
            .subscribe(
              (res) => {
                // console.log('login.loginService.res', res);
                if (res.error) {
                  console.log('erro ==>', res.error);
                  this.result = true;
                  this.setCurrentPage(
                    GET_LOGIN_ERROR_PAGE(
                      LOGIN_ERROR_PAGE_CATALOG.invalidProduct
                    )
                  );
                  return;
                }
                this.result = true;
                this.setUserInfoStorage(data);
                this.logg.logFirebaseEvent('sucesso_login');
                this.store.dispatch(
                  new ScreenSet({
                    screenName: 'login',
                  })
                );
                this.logg.logEventGA('login', 'sucesso');
                this.dismiss({
                  loginSuccess: true,
                });
              },
              (err) => {
                // console.log('login.loginService.err', err);
                this.result = true;
                const { statusText, status } = err;
                if (
                  statusText === 'Unknown Error' ||
                  status === 500 ||
                  status === 503
                ) {
                  this.setUnavailableError(err);
                  return;
                }
                this.setInvalidDataPage();
              }
            );
        },
        (err) => {
          // console.log('login.recaptchaService.err', err);
          this.result = true;
          this.setUnavailableError();
        }
      )
    );
  }
  resolveLoginTimeout() {
    if (!this.result) {
      console.log('timeout login', this.currentStep);
      this.setUnavailableError();
    }
  }
  setUnavailableError(err?) {
    if (err && err.status === 503) {
      this.setServerUnderMaintenance();
      return;
    }
    const errorPage =
      this.product.tecnology === TecnologyEnum.COBRE
        ? LOGIN_ERROR_PAGE_CATALOG.unavailableCobre
        : LOGIN_ERROR_PAGE_CATALOG.unavailable;
    this.setCurrentPage(GET_LOGIN_ERROR_PAGE(errorPage));
  }
  setServerUnderMaintenance() {
    const errorPage = LOGIN_ERROR_PAGE_CATALOG.unavailableMaintenance;
    this.setCurrentPage(GET_LOGIN_ERROR_PAGE(errorPage));
  }
  setInvalidDataPage() {
    if (ProductHelper.isFibra(this.product.productCode)) {
      this.setCurrentPage(
        GET_LOGIN_ERROR_PAGE(LOGIN_ERROR_PAGE_CATALOG.invalidDataFibra)
      );
      return;
    }
    if (this.product.productCode === ProductCodeEnum.TVDTH) {
      this.setCurrentPage(
        GET_LOGIN_ERROR_PAGE(LOGIN_ERROR_PAGE_CATALOG.invalidDataTV)
      );
      return;
    }
    this.setCurrentPage(
      GET_LOGIN_ERROR_PAGE(LOGIN_ERROR_PAGE_CATALOG.invalidData)
    );
  }
  presentWarningNoLogin() {
    this.setCurrentPage(
      GET_LOGIN_ERROR_PAGE(LOGIN_ERROR_PAGE_CATALOG.warningLogin)
    );
  }

  setCurrentPage(page) {
    this.currentStep = page;
    this.publishGA();
  }

  publishGA() {
    const analytics: ScreenStateModel = {
      screenName: this.currentStep.gaPageName,
    };
    if (this.currentStep.fluxo) {
      analytics.contextFlow = this.currentStep.fluxo;
    }
    this.store.dispatch(new ScreenSet(analytics));
  }

  continueWithoutLogin() {
    this.dismiss({
      loginSkiped: true,
    });
  }
  restartProcess() {
    this.goToCpfOrCnpjStep();
  }
  cleanErrors() {
    this.cpfOrCnpjFormControl.setErrors(undefined);
  }
  validCpfOrCnpj(params) {
    const gaLabel = 'erro_cpf_cnpj_invalido';
    const label = 'visualizou';
    const input = `${GeneralHelper.onlyNumbers(
      this.cpfOrCnpjFormControl.value
    )}`;
    if (
      ValidationHelper.validateCPF(input) ||
      ValidationHelper.validateCNPJ(input)
    ) {
      this[params.call](params.params);
      return;
    }
    if (input.length <= 11 && !ValidationHelper.validateCPF(input)) {
      this.publishEventGA(gaLabel, label);
      this.cpfOrCnpjFormControl.setErrors({
        error: 'CPF Inválido',
      });
      return;
    }
    if (!ValidationHelper.validateCNPJ(input)) {
      this.publishEventGA(gaLabel, label);
      this.cpfOrCnpjFormControl.setErrors({
        error: 'CNPJ Inválido',
      });
      return;
    }
  }
  backStep() {
    this.goToCpfOrCnpjStep();
  }
  isCpfOrCnpjStep() {
    return this.loginSteps && this.currentStep === this.loginSteps.cpfOrCnpj;
  }
  isInvalidDataStep() {
    return (
      this.currentStep &&
      this.currentStep.type === LOGIN_ERROR_PAGE_CATALOG.invalidData
    );
  }
  hasError() {
    return false;
  }
  loginOffer(evt) {
    if (!evt) {
      this.dismiss();
      return;
    }
  }
  public isMobilePlatform() {
    return this.platform.is('hybrid');
  }
  errorMessage(evt) {
    if (!evt) {
      return;
    }
    const { action } = evt;
    if (action) {
      this[action.call](action.params);
    }
  }
  public publishEventGA(evt: string, label?: string) {
    this.logg.logEventGA(evt, label || 'click');
  }
  public async loginMinhaOi() {
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    const captchaToken = await this.recaptchaService
      .execute('login')
      .toPromise();
    await this.secureStorage.set(
      'selected-product-code',
      JSON.stringify(product)
    );
    await this.secureStorage.set('captcha-token', captchaToken);
    this.iab.createInAppBrowser(TECNICO_VIRTUAL_API.loginMinhaOi);
    this.dismiss();
  }

  public callNovaFibraChecker(params) {
    const { hasLegacy, onlyNovaFibra } = params;
    const cpfOrCnpj = GeneralHelper.onlyNumbers(
      this.cpfOrCnpjFormControl.value
    );
    this.loadingButton = true;
    this.loginService.checkNovaFibra(cpfOrCnpj).subscribe(
      (res: any) => {
        this.loadingButton = false;
        if (!res) {
          this[hasLegacy.call](hasLegacy.params);
          return;
        }
        const { produtosLegado, produtosNovaFibra } = res;
        // SÓ TEM NOVA FIBRA
        if (!!produtosNovaFibra && !produtosLegado) {
          this[onlyNovaFibra.call](onlyNovaFibra.params);
          return;
        }
        this[hasLegacy.call](hasLegacy.params);
      },
      (err) => {
        this.loadingButton = false;
        console.error(err);
        this[hasLegacy.call](hasLegacy.params);
      }
    );
  }
  openLinkExterno({ link }) {
    if (link) {
      this.iab.goToLink(link);
    }
  }

  public handlerNovaFibraUser() {
    const isAndroid = this.checkIfAndroid();
    if (isAndroid) {
      this.setCurrentPage(
        GET_LOGIN_ERROR_PAGE(LOGIN_ERROR_PAGE_CATALOG.novaFibraAndroid)
      );
      return;
    }
    this.setCurrentPage(
      GET_LOGIN_ERROR_PAGE(LOGIN_ERROR_PAGE_CATALOG.novaFibraIos)
    );
    return;
  }
  checkIfAndroid() {
    return this.platform.is('android');
  }
}
