import { UrlParamsService } from './../../services/url-params.service';
import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ProductIdentifierEnum, ProductCodeEnum } from 'src/app/enums/product.enum';
import { PRODUCT_PORTFOLIO_LIST } from './../product-portfolio.constants';

@Component({
  selector: 'tecvirt-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss'],
})
export class PortfolioListComponent implements OnInit {

  @Output() productSelected = new EventEmitter<any>();
  @Output() viewMoreEvt = new EventEmitter<any>();
  @Output() updateBanner = new EventEmitter<any>();
  items = PRODUCT_PORTFOLIO_LIST;
  cpfOrCnpjStep = true;
  subItems = [];
  iconPath = './assets/icon/product-portfolio';
  constructor(
    public analyticsService: AnalyticsService,
    public urlParamsService: UrlParamsService
  ) { }

  ngOnInit() {
    if (this.urlParamsService.isVoicenet()) {
      this.items[1].technologies.forEach(el => {
        if (el.identifier === ProductIdentifierEnum.FIXO) {
          el.displayName = 'Fixo Cobre / Voicenet';
        }
      });
    }
  }
  productSelect($event, item) {
    this.productSelected.emit(item);
    $event.stopPropagation();
  }
  logProductEvent(item) {
    if (!item.open) {
      this.analyticsService.logEventGA(item.gaAction, 'click');
    }
  }
  scrollScreen(evt) {
    this.analyticsService.logEventGA('descer', 'click');
    this.viewMoreEvt.emit(evt);
  }
  isMobileWidth() {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    return mediaQuery.matches;
  }
  expandProduct(item) {
    this.logProductEvent(item);
    this.items.forEach((el) => {
      if (item === el) {
        el.open = !el.open;
      } else {
        el.open = false;
      }
    });
  }
  setProductList(list) {
    this.items = list;
    this.updateBanner.emit(this.hasFibra());
    this.cpfOrCnpjStep = false;
  }

  hasFibra() {
    const tecnologiesList = [];
    this.items.forEach(el => tecnologiesList.push(...el.technologies));
    return tecnologiesList.some(el => el.productCode === ProductCodeEnum.FIBRA);
  }
}
