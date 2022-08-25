/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@Injectable({
  providedIn: 'root'
})
export class NativeSettingsService {

  constructor(public nativeSettings: OpenNativeSettings) { }

  /**
   * 
   * @param settingName e.g wifi
   */
  openSetting(settingName: string) {
    return new Promise((resolve, reject) => {
      this.nativeSettings.open(settingName).then(res => resolve(res)).catch(err => reject(err));
    });
  }
}
