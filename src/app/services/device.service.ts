/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Injectable } from '@angular/core';
import packageInfo from '../../../package.json';
import { Device } from '@capacitor/device';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  async getDeviceInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await Device.getInfo();
        delete device.realDiskFree;
        delete device.memUsed;
        delete (device as any).battery;
        delete device.realDiskTotal;
        return resolve({ device });
      } catch (e) {
        return resolve({});
      }
    });
  }

  async getAppVersion(): Promise<{ appVersion?: string, appBuild?: string, formatedVersion: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await Device.getInfo();
        const { osVersion, manufacturer} = device;
        const formatedVersion = this.formatAppVersion(osVersion || packageInfo.version, manufacturer);
        return resolve({
          appVersion: osVersion || packageInfo.version,
          formatedVersion
        });
      } catch (e) {
        const formatedVersion = this.formatAppVersion(packageInfo.version, undefined);
        return resolve({ appVersion: packageInfo.version, appBuild: '', formatedVersion });
      }
    });
  }
  public formatAppVersion(appVersion: string, buildVersion: string): string {
    const env = environment.ENVIRONMENT;
    const sufix = env !== 'PROD' ? `_${env}` : '';
    if (buildVersion) {
      return `${appVersion} (${buildVersion})${sufix}`;
    }
    return `${appVersion}${sufix}`;
  }
}
