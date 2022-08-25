import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { SplashscreenService } from '../services/splashscreen.service';
import { LocationAction } from '../actions/location.actions';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-deeplink-catalog',
  templateUrl: './deeplink-catalog.page.html',
  styleUrls: ['./deeplink-catalog.page.scss'],
})
export class DeeplinkCatalogPage implements OnInit {

  productObj;
  user: User;
  data;
  constructor(private store: Store,
    public sc: SplashscreenService,
  ) { }

  ngOnInit() {
    this.sc.hide();
    this.store.dispatch(new LocationAction('deeplink'));
  }


}
