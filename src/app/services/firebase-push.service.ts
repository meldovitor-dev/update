import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { PushNotifications, Token, ActionPerformed, PushNotificationSchema } from '@capacitor/push-notifications';
import { Store } from '@ngxs/store';
import { UtilitySet } from '../actions/utility.actions';

@Injectable({
  providedIn: 'root'
})
export class FirebasePushService {

  constructor(
    private platform: Platform,
    public store: Store
  ) { }
  register() {
    if (!this.platform.is('capacitor')) {
      console.log('Platform not registered on push notification');
      return;
    }
    PushNotifications.register();
    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
        const { value } = token || { value: '' };
        this.store.dispatch(new UtilitySet({
          firebaseToken: value
        }));
      }
    );
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );
    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
}
