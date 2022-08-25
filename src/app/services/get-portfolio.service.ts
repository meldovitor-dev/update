import { Injectable } from '@angular/core';
import { RequestProviderService } from './request-provider.service';
import { PRODUCT_PORTFOLIO_LIST } from '../product-portfolio/product-portfolio.constants';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';
import { take } from 'rxjs/operators';
import { ProductCodeEnum } from '../enums/product.enum';

@Injectable({
  providedIn: 'root'
})
export class GetPortfolioService {

  productList = PRODUCT_PORTFOLIO_LIST;
  constructor(public req: RequestProviderService) {
  }

  async getPortfolio(cpf) {
    try {
      const options = { headers: { cpf } };
      const res = await this.req.get(TECNICO_VIRTUAL_API.checaProdutos, options).pipe(take(1)).toPromise();
      let filteredList = JSON.parse(JSON.stringify(this.productList));
      if (!res) {
        return [];
      }
      const productEnumArray = [ProductCodeEnum.BANDA_LARGA, ProductCodeEnum.FIXO, ProductCodeEnum.TVDTH];
      productEnumArray.forEach(el => {
        if (!res[el]) {
          filteredList[el].technologies = filteredList[el].technologies
            .filter(element => element.productCode !== el);
        }
      });
      if (!res[ProductCodeEnum.FIBRA]) {
        productEnumArray.forEach(el => {
          filteredList[el].technologies = filteredList[el].technologies
            .filter(element => element.productCode !== ProductCodeEnum.FIBRA);
        });
      }
      filteredList = filteredList.filter(el => el.technologies.length);
      return filteredList;
    } catch (e) {
      console.error(e);
      return { error: true, status: e.status };
    }
  }
  async checaNovaFibra(cpf) {
    try {
      const options = { headers: { cpf } };
      const res: any = await this.req.get(TECNICO_VIRTUAL_API.checkMundoNovo, options).pipe(take(1)).toPromise();
      console.log(res);
      if (res && res.produtosNovaFibra > 0) {
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
