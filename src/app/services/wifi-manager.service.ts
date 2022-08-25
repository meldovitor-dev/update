/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';
import { DeviceService } from './device.service';
import { RequestProviderService } from './request-provider.service';
import { NetworkWifiInfoInterface, WifiInfoInterface } from '../troubleshooting/troubleshooting-interface';

export type WifiModel = {
  SSID: string,
  frequency: string,
  level: number,
};

export enum WifiLevelEnum {
  NO_SIGNAL = 0,
  WEAK = 1,
  MEDIUM = 2,
  STRONG = 3,
}

@Injectable({
  providedIn: 'root'
})
export class WifiManagerService {
  wifiInfo$ = new BehaviorSubject<WifiInfoInterface>({});
  constructor(public device: DeviceService,
    private req: RequestProviderService) { }


  public static getWifiLevel(level) {
    if (level >= -66) {
      return WifiLevelEnum.STRONG;
    }
    if (level < -66 && level >= -74) {
      return WifiLevelEnum.MEDIUM;
    }
    return WifiLevelEnum.WEAK;
  }
  public static getWifiFrequency(freq): string {
    if (freq > 3000) {
      return '5 GHz';
    }
    return '2.4 GHz';
  }
  public static getEffectiveLinkSpeed(linkSpeed, freq): string {
    const linkSpeedStr = String(linkSpeed);
    const linkSpeedNum = parseInt(linkSpeedStr.replace(/\D/g, ''), 10);
    if (freq > 3000) {
      return (linkSpeedNum * 0.6).toFixed() + ' Mega';
    }
    return (linkSpeedNum * 0.5).toFixed() + ' Mega';
  }
  public static getScanList(scanListBuffer, ssidWanted) {
    if (!scanListBuffer) {
      return { ChannelBandwidth: 0 };
    }
    const scanListArray = scanListBuffer.split('&&');
    scanListArray.pop();
    const scanListObject = {};
    const ssidString = scanListArray.find(el => el.includes(ssidWanted));
    if (!ssidString) {
      return { ChannelBandwidth: 0 };
    }
    const ssidArray = ssidString.split(', ');
    ssidArray.forEach(element => {
      const tupla = element.split(': ');
      scanListObject[tupla[0]] = tupla[1];
    });
    return scanListObject;
  }
  public isWifiEnabled() {
    const { TecVirtWifiManager } = Plugins;
    return new Promise(async (resolve, reject) => {
      try {
        const result = await TecVirtWifiManager.isWifiEnabled();
        resolve(result && result.enabled);
      } catch (e) {
        resolve(false);
      }
    });
  }
  public isSSIDValid(ssid) {
    return (ssid && ssid.length && ssid !== '<unknown ssid>');
  }
  /**
   * @returns originalObject: object, ssid: string, linkSpeed: number, wifiIntensity: number, wifiFrequency: number
   */
  getWifiInfo() {
    const { TecVirtWifiManager } = Plugins;
    return new Promise(async (resolve, reject) => {
      try {
        const result = await TecVirtWifiManager.getWifiInfo();
        const { ssid } = result;
        console.log(result);
        if (!this.isSSIDValid(ssid)) {
          return reject('gps or wifi disabled');
        }
        const SSID = result.ssid.replace(/"/g, '');
        const frequency = WifiManagerService.getWifiFrequency(result.wifiFrequency);
        const scanResult = WifiManagerService.getScanList(result.scanList, SSID);
        const isRede5Ghz = frequency === '5 GHz';
        const sanitizedResult = {
          nomeDaRede: SSID,
          bssid: result.bssid,
          macAddress: result.macAddress,
          linkSpeed: result.linkSpeed,
          velocidadeAparelho: WifiManagerService.getEffectiveLinkSpeed(result.linkSpeed, result.wifiFrequency),
          realFrequency: result.wifiFrequency,
          RSSI: result.wifiIntensity,
          level: WifiManagerService.getWifiLevel(result.wifiIntensity),
          frequency,
          isRede5Ghz,
          bandWidth: scanResult['ChannelBandwidth']
        };
        console.log('Sanitize getWifiInfo', sanitizedResult);
        this.updateWifiInfo(sanitizedResult);
        return resolve(sanitizedResult);
      } catch (e) {
        console.log(e);
        return reject('Could not get wifi info');
      }
    });
  }
  isGpsPermissionAccepted() {
    const { TecVirtWifiManager } = Plugins;
    return new Promise(async (resolve, reject) => {
      try {
        const result = await TecVirtWifiManager.isGpsPermissionAccepted();
        const { permission } = result;
        return resolve(permission);
      } catch (e) {
        return reject(e);
      }

    });
  }
  is5GHzBandSupported() {
    const { TecVirtWifiManager } = Plugins;
    return TecVirtWifiManager.is5GHzBandSupported();
  }
  isGpsEnable() {
    const { TecVirtWifiManager } = Plugins;
    return new Promise(async (resolve, reject) => {
      try {
        const result = await TecVirtWifiManager.isGpsEnable();
        const { gps, network } = result;
        return resolve((gps && network));
      } catch (e) {
        return reject(e);
      }
    });
  }
  isRSSIStrong() {
    const { TecVirtWifiManager } = Plugins;
    return new Promise(async (resolve, reject) => {
      try {
        const result: any = await this.getWifiInfo();
        const { RSSI } = result;
        console.log(RSSI, RSSI > -45);
        return resolve((RSSI >= -45));
      } catch (e) {
        console.log('ERRO ==>', e);
        return reject(e);
      }
    });
  }

  async updateWifiInfo(info: NetworkWifiInfoInterface) {
    const { frequency } = info;
    const value = this.wifiInfo$.value;
    frequency === '5 GHz' ? value.rede5 = info : value.rede24 = info;
    const compatibilityRes = await this.is5GHzBandSupported();
    value.isCompatible5Ghz = compatibilityRes['5ghzSupported'];
    this.wifiInfo$.next(value);
  }

  async captureWifiInfo(id: string, success: boolean, fluxo: string) {
    const deviceInfoRes: any = await this.device.getDeviceInfo();
    const deviceInfo = deviceInfoRes ? deviceInfoRes.device : undefined;
    const { rede5, rede24 } = this.wifiInfo$.value;
    const logArray = [rede5, rede24];
    logArray.forEach(el => {
      if (el) {
        el.success = success;
        el.fluxo = fluxo;
        const logObj = this.createBasicAnalyticsObj(el, deviceInfo);
        this.logWifiInfo(logObj, id);
      }
    });
  }
  async logWifiInfo(obj, id) {
    const url = TECNICO_VIRTUAL_API.wifiInfo.replace('{id}', id);
    try {
      const res = await this.req.post(url, obj, undefined).toPromise();
      console.table(obj);
    } catch (e) {
      console.error('error Post wifiInfo to BE', e);
    }
  }
  createBasicAnalyticsObj(wifiInfo, device) {
    const { isCompatible5Ghz } = this.wifiInfo$.value;
    const rssiOtimo = wifiInfo && wifiInfo.RSSI >= -45;
    const logObj = {
      ...wifiInfo,
      ...device,
      isCompatible5Ghz,
      rssiOtimo
    };
    return Object.assign({}, logObj);
  }
  async isConnectedToOiWifi(redesList: any[]) {
    const { TecVirtWifiManager } = Plugins;
    try {
      const { ssid: ssidConnected } = await TecVirtWifiManager.getWifiInfo();
      if (!ssidConnected) {
        return false;
      }
      return redesList.some(el => el.ssid.toLowerCase() === ssidConnected.toLowerCase());
    } catch (e) {
      return false;
    }
  }
}
