import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

declare let cordova;

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  list = [
    'ACCESS_FINE_LOCATION',
    'INTERNET',
    'PROCESS_OUTGOING_CALLS',
    'CALL_PHONE',
    'READ_PHONE_STATE',
    'ANSWER_PHONE_CALLS',
    'READ_CALL_LOG',
    'SYSTEM_ALERT_WINDOW',
    'USE_FULL_SCREEN_INTENT'
  ];
  constructor(public platform: Platform) { }
  init() {
    if (this.platform.is('ios') || !this.platform.is('hybrid')) {
      return;
    }
    if (cordova && cordova.plugins && cordova.plugins.permissions) {
      this.handlerPermissions();
    }
  }
  handlerPermissions() {
    const { permissions } = cordova.plugins;
    const appPermissions = this.list.map(p => permissions[p]).filter(el => !!el);
    permissions.hasPermission(appPermissions, (status) => {
      if (status && status.hasPermission) {
        return;
      }
      permissions.requestPermissions(appPermissions, (sts) => {
        // success cb
      }, (error) => {
        // error cb
      });
    }, (error) => {
      // error cb
    });
  }
}
