import { ProductCodeEnum, ProductIdentifierEnum } from 'src/app/enums/product.enum';
import { ModalController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { ValidationHelper } from 'src/app/helpers/validation.helper';
import { RequestProviderService } from 'src/app/services/request-provider.service';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';
import { take } from 'rxjs/operators';
import { PRODUCT_PORTFOLIO_LIST } from 'src/app/product-portfolio/product-portfolio.constants';

@Component({
  selector: 'tecvirt-get-portfolio-modal',
  templateUrl: './get-portfolio-modal.component.html',
  styleUrls: ['./get-portfolio-modal.component.scss'],
})
export class GetPortfolioComponent implements OnInit {
  iosMargin = false;
  cpfOrCnpjFormControl = new FormControl('');
  loadingButton = false;
  constructor(public modalController: ModalController,
    private platform: Platform,
    public req: RequestProviderService,) { }

  ngOnInit() {
    if (this.platform.is('ios')) {
      this.iosMargin = true;
    }
  }
  closeModal(params?) {
    this.modalController.dismiss(params);
  }

  cleanErrors() {
    this.cpfOrCnpjFormControl.setErrors(undefined);
  }

  isDisabled() {
    const num = GeneralHelper.onlyNumbers(this.cpfOrCnpjFormControl.value);
    const size = `${num}`.length;
    const test = size < 11 || size > 14;
    return test;
  }

  validCpfOrCnpj() {
    const gaLabel = 'erro_cpf_cnpj_invalido';
    const label = 'visualizou';
    const input = `${GeneralHelper.onlyNumbers(this.cpfOrCnpjFormControl.value)}`;
    if (ValidationHelper.validateCPF(input) || ValidationHelper.validateCNPJ(input)) {
      return true;
    }
    if (input.length <= 11 && !ValidationHelper.validateCPF(input)) {
      this.cpfOrCnpjFormControl.setErrors({
        error: 'CPF Inválido'
      });
      return false;
    }
    if (!ValidationHelper.validateCNPJ(input)) {
      this.cpfOrCnpjFormControl.setErrors({
        error: 'CNPJ Inválido'
      });
    }
    return false;
  }

  getPortfolio() {
    this.loadingButton = true;
    if (!this.validCpfOrCnpj()) {
      this.loadingButton = false;
      return;
    }
    const cpf = GeneralHelper.onlyNumbers(this.cpfOrCnpjFormControl.value);
    const options = { headers: { cpf } };
    this.req.get(TECNICO_VIRTUAL_API.checaProdutos, options).pipe(take(1)).subscribe((res: any) => {
      let productList = JSON.parse(JSON.stringify(PRODUCT_PORTFOLIO_LIST));
      if (!res) {
        return this.closeModal(productList);
      }
      const productEnumArray = [ProductCodeEnum.BANDA_LARGA, ProductCodeEnum.FIXO, ProductCodeEnum.TVDTH];
      productEnumArray.forEach(el => {
        if (!res[el]) {
          productList[el].technologies = productList[el].technologies
            .filter(element => element.productCode !== el);
        }
      });
      if (!res[ProductCodeEnum.FIBRA]) {
        productEnumArray.forEach(el => {
          productList[el].technologies = productList[el].technologies
            .filter(element => element.productCode !== ProductCodeEnum.FIBRA);
        });
      }
      productList = productList.filter(el => el.technologies.length);
      this.loadingButton = false;
      return this.closeModal(productList);
    },
      err => {
        console.error(err)
        return this.closeModal();
      });
  }
}
