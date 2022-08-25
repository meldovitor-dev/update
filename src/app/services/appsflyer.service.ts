import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { UtilityState } from '../states/utility.state';
import { filter, take } from 'rxjs/operators';

declare let AF: any;
declare let window: any;


@Injectable({
  providedIn: 'root'
})
export class AppsflyerService {

  constructor(private platform: Platform,
    private store: Store) { }

  public initSdk() {
    if (this.isMobilePlatform()) {
      const OPTIONS = {
        devKey: environment.CREDENTIALS.appsflyer.devKey,
        appId: environment.CREDENTIALS.appsflyer.appId
      };
      try {
        const response = window.plugins.appsFlyer.initSdk(OPTIONS);
        // success cb are not working on init sdk, scheduling fire after 5 seconds
        setTimeout(() => {
          if (this.platform.is('hybrid')) {
            this.onSuccess(response);
          }
        }, 5000);
      } catch (e) {
        this.onError('Error on initSDK');
      }

    }
  }

  public async trackEvent(name: string, event = {}) {
    if (this.isMobilePlatform()) {
      try {
        window.plugins.appsFlyer.trackEvent(name, event);
      } catch (e) {
        this.onError('[track event]');
      }
      return;
    }
    if (typeof AF === 'function') {
      AF(name, 'event', event);
    }
  }
  public isMobilePlatform() {
    return this.platform.is('hybrid');
  }
  public onSuccess(response: any) {
    const sub = this.store.select(UtilityState.getFirebaseToken).pipe(
      filter(str => !!str),
      take(1)
    ).subscribe(token => {
      this.registerUninstall(token);
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  public registerUninstall(token: string = '') {
    try {
      window.plugins.appsFlyer.updateServerUninstallToken(token);
    } catch (e) {
      // error on uninstall token service
    }
  }

  public onError(error: any) {
    console.log('💣 Appsflyer error on register', error);
  }

}
