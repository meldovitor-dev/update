/* eslint-disable @typescript-eslint/member-ordering */
import { UserState } from './../../states/user.state';
import { NativeSettingsService } from './../../services/native-settings.service';
import { ProductCodeEnum } from '../../enums/product.enum';
import { LoginComponent } from '../../modals/login/login.component';
import { GET_HIGHEST_PRIORITY_INFO, INFO_PAGES_CATALOG } from './wildcard-area.constants';
import { PendingActionsService } from 'src/app/services/pending-actions.service';
import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-wildcard-area',
  templateUrl: './wildcard-area.component.html',
  styleUrls: ['./wildcard-area.component.scss'],
})
export class WildcardAreaComponent implements OnInit, AfterContentInit {
  public information;
  public wildcardIds = [INFO_PAGES_CATALOG.logado];
  @Input() product: string;
  constructor(public pas: PendingActionsService,
              public loginService: LoginService,
              public store: Store,
              public settingsService: NativeSettingsService) { }

  ngOnInit() {
  }
  ngAfterContentInit(): void {
    this.listenInformations(); // observable for pendencies
    if (this.loginService.isLoggedIn()) {
      this.updatePendingPage([INFO_PAGES_CATALOG.logado]);
    }
  }
  listenInformations() {
    const ids = [
      ...this.pas.snapshotPendencies().map(el => el.id),
      ...this.wildcardIds
    ];
    this.updatePendingPage(ids);
    this.pas.pendenciesChanges().subscribe(res => {
      this.updatePendingPage([
        ...res.map(el => el.id),
        ...this.wildcardIds
      ]);
    });
  }
  updatePendingPage(ids = []) {
    this.information = GET_HIGHEST_PRIORITY_INFO(ids);
  }
  getProductName() {
    return this.product.includes('Fibra') ? 'Fibra' : this.product;
  }
  getKeyCpfOrCnpj() {
    return GeneralHelper.keyCpfOrCnpj(this.loginService.getUser().cpfOrCnpj);
  }
  getKeyIdentifier() {
    return GeneralHelper.keyIdentifier(this.loginService.getUser().productCode);
  }
  getCpfOrCnpj() {
    return GeneralHelper.mask('cpfOrCnpj', this.loginService.getUser().cpfOrCnpj);
  }
  getIdentifier() {
    const telIdentifiers = [ProductCodeEnum.FIXO, ProductCodeEnum.BANDA_LARGA];
    if ( telIdentifiers.includes(this.loginService.getUser().productCode)) {
      return GeneralHelper.mask('phone', this.loginService.getUser().identifier);
    }
    return this.loginService.getUser().identifier;
  }
  maskCpfOrCnpj(data) {
    return (data.length === 11) ? GeneralHelper.mask('cpf', data) : GeneralHelper.mask('cnpj', data);
  }
  maskIdentifier(data) {
    const productsTerminalList = [ProductCodeEnum.BANDA_LARGA, ProductCodeEnum.FIXO];
    if (productsTerminalList.includes(this.loginService.getUser().productCode)) {
      return GeneralHelper.mask('phone', data);
    }
    return data;
  }
  identifierLabelSelector(p) {
    const productsTerminalList = [ProductCodeEnum.BANDA_LARGA, ProductCodeEnum.FIXO];
    if (productsTerminalList.includes(this.loginService.getUser().productCode)) {
      return p.replace('Nº Cliente', 'Terminal');
    }
    return p;

  }
  resolvePendingAction(action) {
    if ( this.loginService.isLoggedIn() ) {
      return;
    }
    this[action.call](action.params);
  }
  goLogin() {
    const cpfOrCnpj = this.store.selectSnapshot(UserState.getUserCpfOrCnpj);
    if (cpfOrCnpj) {
      this.loginService.loginWithForm(LoginComponent, {cpfOrCnpj});
      return;
    }
    this.loginService.loginWithForm(LoginComponent);
  }
  goOnline() {
    this.settingsService.openSetting('wifi');
  }
  getContractName() {
    const contratos = this.store.selectSnapshot(UserState.getUser).contratos;
    const identifier = this.loginService.getUser().identifier;
    const contrato = contratos.find(el => el.contrato === identifier);
    return contrato.nomeDoPlano || contrato.descricao || this.getProductName();
  }
  moreThanOneContract(): boolean {
    const contratos = this.store.selectSnapshot(UserState.getUser).contratos;
    return contratos && contratos.length > 1;
  }
  async handlerChangeContract() {
    if (!this.moreThanOneContract()) {
      return;
    }
    const fromHome = true;
    const contract = await this.loginService.handleMoreThanOneContract(fromHome);
    if (!contract) {
      return;
    }
    this.loginService.changeContractLogin(contract, LoginComponent);
  }
}
