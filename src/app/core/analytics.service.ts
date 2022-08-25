/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserState } from '../states/user.state';
import { ProductState } from '../states/product.state';
import { FeatureState } from '../states/feature.state';
import { AppState, AppStateModel } from '../states/app.state';
import { ProductHelper } from '../helpers/product-helper';
import { environment } from 'src/environments/environment';
import { MongoAnalyticsService } from './mongo-analytics.service';
import { ConnectionState } from '../states/connection.state';
import { DeviceService } from '../services/device.service';
import { ScreenState } from '../states/screen.state';
import { FirebaseAnalyticsService } from '../services/firebase-analytics.service';
import { AppsflyerService } from '../services/appsflyer.service';


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public LABEL = {
    CLICK: 'click',
    VISUALIZOU: 'visualizou',
  };
  deviceInfo;
  currentEvent: any;
  constructor(
    public store: Store,
    public mongoAnalyticsService: MongoAnalyticsService,
    public firebaseService: FirebaseAnalyticsService,
    public appsflyer: AppsflyerService,
    public device: DeviceService) {

    this.initServices();

  }
  async initServices() {
    this.mongoAnalyticsService.init();
    try {
      this.deviceInfo = await this.device.getDeviceInfo();
    } catch (e) {
      // error get device info
    }
  }
  logEventGA(actionGa: string, label: string, options?) {
    const eventObj = {
      ... {
        label,
        action_GA: actionGa,
        action: actionGa,
      },
      ...this.createBasicAnalyticsObj(options || {}),
    };
    this.dispatchEvents('interaction', eventObj);
    this.dispatchAppsflyerEvent(eventObj);
  }
  logScreenViewGa(name: string) {
    const eventObj = {
      ... {
        screenName: name,
      },
      ...this.createBasicAnalyticsObj(),
    };
    this.dispatchEvents('screenview', eventObj);
    this.dispatchAppsflyer(name);
  }
  logFirebaseEvent(name: string) {
    const eventObj = {};
    this.firebaseService.logEvent(name, eventObj);
  }
  // special events, appsflyer only
  logAppsflyer(event: string, params: any) {
    this.appsflyer.trackEvent(event, params); // fire appsflyer gaPageName
  }
  createBasicAnalyticsObj(options?) {
    const logObj = {
      ...{
        previousPage: this.getScreenState().previousPage || '',
        category: this.getScreenState().screenName || '',
        appVersion: this.getAppState().version || '',
        canal: this.getAppState().channel || '',
        sessionUUID: this.getUserState().sessionUUID || '',
        produto: this.getProductState().ga || '',
        problema: this.getFeatureState().ga || '',
        fluxo: this.getScreenState().contextFlow || '',
        ddd: this.getDDD() || '',
        cpf: this.getUserState().cpfOrCnpj || '',
        userId: this.getUserState().id || '',
        identifier: this.getUserState().identifier || '',
        protocol: this.getFeatureState().protocol || '',
        level: 'info',
        mode: this.getConnection().connected ? 'ONLINE' : 'OFFLINE',
        repair: options && options.repair ? options.repair : [],
        os: options && options.os ? options.os : [],
        environment: environment.ENVIRONMENT === 'PROD' ? 'prod' : 'dev',
      },
      ...this.deviceInfo
    };
    return Object.assign({}, logObj);
  }
  dispatchEvents(event, params) {
    const cleanedParams = this.cleanParams(params);
    this.consoleLogEvent(event, params);
    this.mongoAnalyticsService.logEvent(cleanedParams);
    this.firebaseService.logEvent(event, params);
  }
  /**
   * reduce payload to mongo
   *
   * @objAnalytic
   */
  cleanParams(objAnalytic) {
    const params$ = JSON.parse(JSON.stringify(objAnalytic));
    for (const key in params$) {
      if (params$[key] === '' || params$[key] === undefined || params$[key] === null) {
        delete params$[key];
      }
    }
    if (params$.device) {
      for (const key in params$.device) {
        if (params$.device[key] === '' || params$.device[key] === undefined || params$.device[key] === null) {
          delete params$.device[key];
        }
      }
    }
    return params$;
  }

  appsflyerDimensions() {
    const dimensions = {
      produto: this.getProductState().ga || '',
      problema: this.getFeatureState().ga || '',
      fluxo: this.getScreenState().contextFlow || ''
    };
    return dimensions;
  }

  dispatchAppsflyer(name: string) {
    const flow = this.getScreenState().contextFlow ? `_${this.getScreenState().contextFlow}` : '';
    const product = this.getProductState().ga ? `_${this.getProductState().ga}` : '';
    const event = `${name}${product}${flow}`;
    this.appsflyer.trackEvent(event, this.appsflyerDimensions()); // fire appsflyer gaPageName
  }
  dispatchAppsflyerEvent(evt: any) {
    const flow = this.getScreenState().contextFlow ? `_${this.getScreenState().contextFlow}` : '';
    const product = this.getProductState().ga ? `_${this.getProductState().ga}` : '';
    const category = this.getScreenState().screenName || '';
    const { action, label } = evt;
    const event = `${category}_${action}_${label}${product}${flow}`;
    this.appsflyer.trackEvent(event, this.appsflyerDimensions()); // fire appsflyer gaPageName
  }

  consoleLogEvent(event, eventObj) {
    if (environment.DISABLE_LOG_GA) {
      return;
    }
    const { screenName, action, produto, problema, fluxo, previousPage, category, label } = eventObj;
    const logObj = {
      action,
      screenView: screenName,
      previousPage,
      category,
      produto,
      problema,
      fluxo,
      label,
    };
    if (event === 'screenview') {
      console.log('\nlogScreenviewGa ===>', logObj.screenView);
      delete logObj.category;
      delete logObj.action;
    } else {
      console.log('\nlogEventGa ===>', eventObj.action);
      delete logObj.screenView;
    }

    console.table(logObj);

  }

  getUserState(): any {
    return this.store.selectSnapshot(UserState.getUser) || {};
  }
  getProductState(): any {
    return this.store.selectSnapshot(ProductState.getCurrentProduct) || {};
  }
  getFeatureState(): any {
    return this.store.selectSnapshot(FeatureState.getFeature) || {};
  }
  getAppState(): any {
    return this.store.selectSnapshot(AppState.getApp) || {};
  }
  getScreenState(): any {
    return this.store.selectSnapshot(ScreenState.getScreen) || {};
  }
  getConnection(): any {
    return this.store.selectSnapshot(ConnectionState.getConnection) || {};
  }
  getDDD() {
    const user = this.getUserState();
    return ProductHelper.getDDD(user);
  }
}
