import { UserCpfOrCnpjSet } from './../../actions/user.actions';
import { Store } from '@ngxs/store';
import { Product } from 'src/app/domain/product';
import { ValidationHelper } from './../../helpers/validation.helper';
import { GeneralHelper } from './../../helpers/general.helper';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CPF_OR_CNPJ_PAGE, LOGIN_ERROR_PAGE_CATALOG } from 'src/app/modals/login/login.constants';
import { PRODUCT_PORTFOLIO_LIST } from '../product-portfolio.constants';
import { GetPortfolioService } from 'src/app/services/get-portfolio.service';
import { LoginService } from 'src/app/services/login.service';
import { Platform } from '@ionic/angular';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { AnalyticsService } from 'src/app/core/analytics.service';


@Component({
  selector: 'tecvirt-get-portfolio',
  templateUrl: './get-portfolio.component.html',
  styleUrls: ['./get-portfolio.component.scss'],
})
export class GetPortfolioComponent implements OnInit {

  page = CPF_OR_CNPJ_PAGE;
  productList = PRODUCT_PORTFOLIO_LIST;
  useTermsNotAccepted = true;
  cpfOrCnpjFormControl = new FormControl('');
  loadingButton = false;
  skipButton = { gaAction: 'continuar_sem_login' };
  @Output() clickEvent = new EventEmitter<any>();

  constructor(private getPortfolioService: GetPortfolioService,
    private loginService: LoginService,
    public platform: Platform,
    public store: Store,
    private analyticsService: AnalyticsService) { }

  ngOnInit() {
  }

  useTermsUpdated(evt) {
    this.useTermsNotAccepted = !evt;
    console.log(this.useTermsNotAccepted);
  }

  clearErrors() {
    this.cpfOrCnpjFormControl.setErrors(undefined);
  }

  async getPortfolio() {
    if (!this.validateCpfOrCnpj()) {
      return;
    }
    this.loadingButton = true;
    const cpfOrCnpj = GeneralHelper.onlyNumbers(this.cpfOrCnpjFormControl.value);
    const filteredList = await this.getPortfolioService.getPortfolio(cpfOrCnpj);
    if (filteredList.error && filteredList.status != 404) {
      this.loginService.loginWithForm(LoginComponent, { errorReason: LOGIN_ERROR_PAGE_CATALOG.unavailableLogin }).then((res: any) => {
        if (res && res.data && res.data.loginSkiped) {
          this.skipPortfolio();
        }
      });
      this.loadingButton = false;
      return;
    }
    if (filteredList.length) {
      this.setUserCpfOrCnpj(cpfOrCnpj);
      this.clickEvent.emit(filteredList);
      this.loadingButton = false;
      return;
    }
    const isNovaFibra = await this.getPortfolioService.checaNovaFibra(cpfOrCnpj);
    if (!isNovaFibra) {
      this.loginService.loginWithForm(LoginComponent, { errorReason: LOGIN_ERROR_PAGE_CATALOG.naoSouCliente }).then((res: any) => {
        if (res && res.data && res.data.loginSkiped) {
          this.skipPortfolio();
        }
      });
      this.loadingButton = false;
      return;
    }
    this.loadingButton = false;
    if (this.platform.is('android')) {
      this.loginService.loginWithForm(LoginComponent, { errorReason: LOGIN_ERROR_PAGE_CATALOG.novaFibraAndroid });
      return;
    }
    this.loginService.loginWithForm(LoginComponent, { errorReason: LOGIN_ERROR_PAGE_CATALOG.novaFibraIos });
  }

  validateCpfOrCnpj() {
    const input = GeneralHelper.onlyNumbers(this.cpfOrCnpjFormControl.value);
    if (ValidationHelper.validateCPF(input) || ValidationHelper.validateCNPJ(input)) {
      return true;
    }
    if (input.length === 11) {
      this.cpfOrCnpjFormControl.setErrors({
        error: 'CPF Inválido'
      });
    }
    if (input.length > 11) {
      this.cpfOrCnpjFormControl.setErrors({
        error: 'CNPJ Inválido'
      });
    }
    return false;
  }
  isDisabled() {
    if (this.cpfOrCnpjFormControl) {
      const cpf = GeneralHelper.onlyNumbers(this.cpfOrCnpjFormControl.value);
      const size = `${cpf}`.length;
      const test = size < 11 || size > 14;
      return test || this.useTermsNotAccepted;
    }
  }

  setUserCpfOrCnpj(cpfOrCnpj) {
    this.store.dispatch(new UserCpfOrCnpjSet(cpfOrCnpj));
  }

  skipPortfolio() {
    this.clickEvent.emit(this.productList);
  }

  publishGaAndSkip() {
    this.analyticsService.logEventGA('continuar_sem_login', 'click');
    this.skipPortfolio()
  }

}
