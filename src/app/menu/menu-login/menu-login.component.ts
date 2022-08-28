import { AnalyticsService } from 'src/app/core/analytics.service';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { ProductInterface } from './../../domain/product.interface';
import { Component, OnInit, Input } from '@angular/core';
import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { TecnologyEnum } from 'src/app/enums/tecnology.enum';

@Component({
  selector: 'tecvirt-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.scss'],
})
export class MenuLoginComponent implements OnInit {

  @Input() product: ProductInterface;
  @Input() user: User;
  identifier: string;
  iconLogin = './assets/icon/menu/icone_login.svg';
  constructor(public loginService: LoginService,
    public analyticsService: AnalyticsService) { }

  ngOnInit() { }

  sanitize(product: ProductInterface) {
    if (product.productCode === ProductCodeEnum.FIBRA) {
      return 'Fibra';
    }
    return product ? product.displayName : '';
  }
  getProductName() {
    if (this.product.tecnology === TecnologyEnum.FIBRA) {
      return 'Fibra';
    }
    return this.product.displayName;
  }
  getKeyCpfOrCnpj() {
    return GeneralHelper.keyCpfOrCnpj(this.user.cpfOrCnpj);
  }
  getKeyIdentifier() {
    return GeneralHelper.keyIdentifier(this.product.productCode);
  }
  getCpfOrCnpj() {
    return GeneralHelper.mask('cpfOrCnpj', this.user.cpfOrCnpj);
  }
  getIdentifier() {
    const telIdentifiers = [ProductCodeEnum.FIXO, ProductCodeEnum.BANDA_LARGA];
    if (telIdentifiers.includes(this.product.productCode)) {
      return GeneralHelper.mask('phone', this.user.identifier);
    }
    return this.user.identifier;
  }
  doLogin() {
    this.publishGa();
    this.loginService.loginWithForm(LoginComponent);
  }
  publishGa() {
    const gaName = 'login_' + this.sanitazeGa(this.product);
    this.analyticsService.logEventGA(gaName, 'click');
  }
  sanitazeGa(product: ProductInterface) {
    if (product.productCode === ProductCodeEnum.FIBRA) {
      return 'fibra';
    }
    return product ? product.ga : '';
  }

}
