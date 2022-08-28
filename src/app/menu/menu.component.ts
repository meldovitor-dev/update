import { ScreenState } from './../states/screen.state';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AppStateModel, AppState } from './../states/app.state';
import { UserState } from './../states/user.state';
import { Observable } from 'rxjs';
import { ProductState } from 'src/app/states/product.state';
import { ProductInterface } from 'src/app/domain/product.interface';
import { Select, Store } from '@ngxs/store';
import { Component } from '@angular/core';
import { ScreenSet } from '../actions/screen.actions';

@Component({
  selector: 'tecvirt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  @Select(ProductState.getCurrentProduct) selectedProduct: Observable<
    ProductInterface
  >;
  @Select(UserState.getUser) user: Observable<User>;
  @Select(AppState.getApp) app: Observable<AppStateModel>;
  @Select(UserState.getAllUsers) users: Observable<User[]>;
  currentPage;
  constructor(private store: Store, private menu: MenuController) { }

  updateMenuState() {
    this.menu.isOpen().then(res => {
      if (res) {
        this.currentPage = this.store.selectSnapshot(ScreenState).screenName;
      }
      const screenName = res ? 'menu' : this.currentPage;
      this.store.dispatch(new ScreenSet({
        screenName
      }));
    });
  }

}
