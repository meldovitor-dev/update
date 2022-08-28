import { ProductState } from './../../../states/product.state';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ValidationHelper } from 'src/app/helpers/validation.helper';
import { take } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { Platform } from '@ionic/angular';
import { LOGIN_ERROR_PAGE_CATALOG } from 'src/app/modals/login/login.constants';

@Component({
  selector: 'tecvirt-footer-login',
  templateUrl: './footer-login.component.html',
  styleUrls: ['./footer-login.component.scss'],
})
export class FooterLoginComponent implements OnInit {
  @Input() pending;
  @Output() resolvePendenciesEvt = new EventEmitter<any>();
  termsOfUse = false;
  cpfControl = new FormControl('');
  constructor(public loginService: LoginService,
    public analyticsService: AnalyticsService,
    public store: Store,
    public platform: Platform) { }

  ngOnInit() {
  }

  public termsUpdated(evt) {
    this.termsOfUse = evt;
  }

  shouldDisable() {
    if (!this.pending.shouldDisableBtn) {
      return false;
    }
    const value = GeneralHelper.onlyNumbers(this.cpfControl.value);
    return !(this.loginService.cpfOrCnpjIsValid(value) && this.termsOfUse);
  }

  goLogin() {
    const { gaAction } = this.pending.button;
    if (gaAction) {
      this.analyticsService.logEventGA(gaAction, 'click');
    }
    const cpfOrCnpj = this.cpfControl.value;
    const product = this.store.selectSnapshot(ProductState.getCurrentProductCode)
    if (product === ProductCodeEnum.FIBRA) {
      this.handleFibraLogin(GeneralHelper.onlyNumbers(cpfOrCnpj))
      return;
    }
    this.loginService.loginWithForm(LoginComponent, { cpfOrCnpj });
  }
  handleFibraLogin(cpfOrCnpj) {
    this.loginService.checkNovaFibra(cpfOrCnpj).pipe(take(1)).subscribe((res: any) => {
      const { produtosLegado, produtosNovaFibra } = res;
      if (!produtosLegado && !!produtosNovaFibra) {
        this.handlerNovaFibraUser();
        return;
      }
      this.loginService.loginWithForm(LoginComponent, { cpfOrCnpj });
    }, err => {
      if (err.status === 429) {
        return;
      }
      this.loginService.loginWithForm(LoginComponent, { cpfOrCnpj });
    });
  }
  resolvePendingAction(button) {
    this.resolvePendenciesEvt.emit(button);
  }
  public handlerNovaFibraUser() {
    const isAndroid = this.checkIfAndroid();
    if (isAndroid) {
      this.loginService.loginWithForm(LoginComponent, {
        errorReason: LOGIN_ERROR_PAGE_CATALOG.novaFibraAndroid
      });
      return;
    }
    this.loginService.loginWithForm(LoginComponent, {
      errorReason: LOGIN_ERROR_PAGE_CATALOG.novaFibraIos
    });
    return;
  }
  checkIfAndroid() {
    return this.platform.is('android');
  }

  validCpfOrCnpj() {
    const gaLabel = 'erro_cpf_cnpj_invalido';
    const label = 'visualizou';
    const input = `${GeneralHelper.onlyNumbers(
      this.cpfControl.value
    )}`;

    if (
      ValidationHelper.validateCPF(input) ||
      ValidationHelper.validateCNPJ(input)
    ) {
      this.goLogin();
      return;
    }
    if (input.length <= 11 && !ValidationHelper.validateCPF(input)) {
      this.publishEventGA(gaLabel, label);
      this.cpfControl.setErrors({
        error: 'CPF Inválido'
      });
      return;
    }
    if (!ValidationHelper.validateCNPJ(input)) {
      this.publishEventGA(gaLabel, label);
      this.cpfControl.setErrors({
        error: 'CNPJ Inválido'
      });
      return;
    }
  }
  public publishEventGA(evt: string, label?: string) {
    this.analyticsService.logEventGA(evt, label || 'click');
  }
}
