import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { ProductInterface } from 'src/app/domain/product.interface';
import { Store, Select } from '@ngxs/store';
import { UserState } from 'src/app/states/user.state';
import { getProductByIdentifier } from 'src/app/domain/product-portfolio';
import { Observable } from 'rxjs';
import { ProductSet } from 'src/app/actions/product.action';
import { gethowToSlides } from 'src/app/shared/image-carousel/how-to.contants';
import { AnalyticsService } from 'src/app/core/analytics.service';


@Component({
    selector: 'tecvirt-login-messages',
    templateUrl: './login-messages.component.html',
    styleUrls: ['./login-messages.component.scss'],
})
export class LoginMessagesComponent {
    @Output() actionEvt = new EventEmitter<any>();
    @Input() page;
    @Input() product: ProductInterface;
    @Select(UserState.getUser) user$: Observable<any>;
    constructor(
        public store: Store,
        public analyticsService: AnalyticsService
    ) {
    }

    onClick(buttonAction) {
        this.actionEvt.emit(buttonAction);
    }
    sanitizeTxt(txt = '') {
        if(!this.product) {
            return txt
        }
        const getTextByProduct = (product: ProductInterface) => {
            if (product && product.productCode === ProductCodeEnum.TVDTH) {
                return '<br/>TV por satélite';
            }
            return 'Oi Fibra';
        };
        return txt.replace('#product#', getTextByProduct(this.product));
    }
    //   85415056009
    sanitizeTitle(txt) {
        if(!this.product) {
            return txt
        }
        return txt.replace('#product#', this.product.displayName);
    }
    getPortfolioItens(portfolio) {
        if (!portfolio) {
            return [];
        }
        return portfolio.map(el => {
            return getProductByIdentifier(el);
        });
    }
    selectProduct(product) {
        const sub = this.store.dispatch(new ProductSet(product)).subscribe(res => {
            if (sub) {
                sub.unsubscribe();
            }
            this.actionEvt.emit({
                action: {
                    call: 'dismiss',
                    params: {

                    }
                }
            });
        });
    }
    getHowToSlides() {
        const slides = gethowToSlides();
        return slides;
      }
    skipLogin(button) {
        const ga = button.gaAction
        this.analyticsService.logEventGA(ga, 'click');
        this.actionEvt.emit(button);
      }
}
