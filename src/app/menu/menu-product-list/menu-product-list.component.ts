import { AnalyticsService } from 'src/app/core/analytics.service';
import { Component, OnInit, Input } from '@angular/core';
import { PRODUCT_MENU_LIST, FIBRA_PRODUCTS } from '../menu.constants';
import { getProductByIdentifier } from 'src/app/domain/product-portfolio';
import { ProductSet, ProductUnset } from 'src/app/actions/product.action';
import { stagger, trigger, transition, query, style, animate } from '@angular/animations';
import { Store } from '@ngxs/store';
import { ProductInterface } from 'src/app/domain/product.interface';
import { User } from 'src/app/models/user.model';
import { CleanAllTicketsAction } from 'src/app/actions/ticket.actions';
import { ProductCodeEnum } from 'src/app/enums/product.enum';

@Component({
  selector: 'tecvirt-menu-product-list',
  templateUrl: './menu-product-list.component.html',
  styleUrls: ['./menu-product-list.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition('* => *', [
        // each time the binding value changes
        query(
          ':enter',
          [
            style({ transform: 'translateX(-50px)', opacity: 0 }),
            stagger(200, [
              animate(
                '200ms',
                style({ transform: 'translateX(0)', opacity: 1 })
              )
            ])
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0)', opacity: 1 }),
            stagger(200, [
              animate(
                '200ms',
                style({ transform: 'translateX(-50px)', opacity: 0 })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class MenuProductListComponent implements OnInit {
  
  @Input() product: ProductInterface;
  @Input() user: User;
  @Input() users: User[];
  productList = PRODUCT_MENU_LIST;
  subItems = [];
  iconPath = './assets/icon/menu';
  constructor(public store: Store, private analyticsService: AnalyticsService) { }

  ngOnInit() {
    if (this.product.productCode === ProductCodeEnum.FIBRA) {
      this.toggleList();
    }
  }

  productSelectAndtoggle(item, last) {
    if (last) {
      this.toggleList();
      return;
    }
    this.productSelect(item);
  }
  toggleList() {
    this.subItems.length ? this.unsetSubItems() : this.setSubItems();
  }
  setSubItems() {
    this.subItems = [...FIBRA_PRODUCTS];
  }
  unsetSubItems() {
    this.subItems = [];
  }
  productSelect(item, evt?) {
    if (evt) {
      evt.stopPropagation();
    }
    if (item.isFibra && this.isNotOnPortfolio(item)) {
      return;
    }
    const productObj = getProductByIdentifier(item.identifier);
    this.setupNewProduct(productObj);
  }
  async setupNewProduct(p) {
    this.publishGa(p);
    await this.store.dispatch(new CleanAllTicketsAction()).toPromise();
    await this.store.dispatch(new ProductUnset()).toPromise();
    await this.store.dispatch(new ProductSet(p)).toPromise();
  }

  isNotOnPortfolio(item) {
    const fibraUser = this.users[3];
    return (
      this.product &&
      fibraUser &&
      fibraUser.authorization &&
      fibraUser.portfolio &&
      !fibraUser.portfolio.includes(item.identifier));
  }
  isLoggedIn() {
    return !!this.users[3].authorization;
  }
  publishGa(p: ProductInterface) {
    const gaName = p.ga;
    this.analyticsService.logEventGA(gaName, 'click');
  }

}
