import { ProductInterface } from './../../domain/product.interface';
import { ProductState } from './../../states/product.state';
import { Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';
import { Component, Injector, Input, OnInit } from '@angular/core';

import { GeneralHelper } from 'src/app/helpers/general.helper';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ScreenSet } from 'src/app/actions/screen.actions';
import { CONTRACT_SELECTOR_CATALOG } from './contract-selector.constants';
import { TecnologyEnum } from 'src/app/enums/tecnology.enum';

@Component({
  selector: 'tecvirt-contract-selector',
  templateUrl: './contract-selector.component.html',
  styleUrls: ['./contract-selector.component.scss'],
})
export class ContractSelectorComponent implements OnInit {
  @Input() contracts: any[];
  @Input() noMask: boolean = false;
  @Input() minhaOi: boolean = false;
  product: ProductInterface;
  constructor(
    public store: Store,
    public modalController: ModalController,
    public analyticsService: AnalyticsService,
    public injector: Injector) { }

  ngOnInit() {
    this.setScreenView();
  }

  dismiss() {
    this.analyticsService.logEventGA('fechar', 'click');
    this.modalController.dismiss();
  }

  select(contract) {
    const selectedIndex = this.contracts.indexOf(contract);
    const actionGA = `contrato_${GeneralHelper.arrayIndexToLetter(selectedIndex)}`;

    this.analyticsService.logEventGA(actionGA, 'click');
    this.modalController.dismiss(contract);
  }

  getContractName(contract) {
    return contract.nomeDoPlano || contract.descricao || this.getProductFallbackName();
  }

  getProductFallbackName() {
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    if (product.tecnology === TecnologyEnum.FIBRA) {
      return 'Fibra';
    }
    return product.displayName;
  }

  getContractTerminal(contract) {
    if (!contract || !(contract.numeroTerminal || contract.terminal)) {
      return;
    }
    const mask = this.noMask ? 'phone' : 'phoneMasked';
    return GeneralHelper.mask(mask, contract.numeroTerminal || contract.terminal);
  }
  getIdentifierNumber(contract) {
    if (contract.productCode === 2) {
      return 'Nº do cliente: ' + contract.identifier;
    }
    const mask = this.noMask ? 'phone' : 'phoneMasked';
    return GeneralHelper.mask(mask, contract.identifier);
  }
  getContractNumber(contract) {
    if (!contract || !contract.contrato) {
      return;
    }
    return this.noMask ? contract.contrato : GeneralHelper.mask('contractMasked', contract.contrato);
  }

  setScreenView() {
    if (this.minhaOi) {
      this.store.dispatch(new ScreenSet(CONTRACT_SELECTOR_CATALOG.loginMinhaOi));
      return;
    }
    if (this.noMask && !this.minhaOi) {
      this.store.dispatch(new ScreenSet(CONTRACT_SELECTOR_CATALOG.trocaContrato));
      return;
    }
    this.store.dispatch(new ScreenSet(CONTRACT_SELECTOR_CATALOG.loginTradicional));
  }
}
