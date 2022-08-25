import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

declare let ga;

@Injectable({
  providedIn: 'root'
})
export class FirebaseAnalyticsService {

  constructor(private platform: Platform) {
  }
  // native platform
  prepareInteraction(data: any) {
    const obj = {
      category: data.category || data.screenName || '',
      produto: data.produto || '',
      problema: data.problema || '',
      fluxo: data.fluxo || '',
      previousPage: data.previousPage || '',
      action: data.action || data.action_GA || '',
      environment: data.environment || 'dev',
      label: data.label || ''
    };
    return obj;
  }
  prepareScreenview(data: any) {
    const obj = {
      screenName: data.screenName || '',
      produto: data.produto || '',
      problema: data.problema || '',
      previousPage: data.previousPage || '',
      fluxo: data.fluxo || '',
      ddd: data.ddd || '',
      environment: data.environment || 'dev',
      sessionuuid: data.sessionUUID || ''
    };
    return obj;
  }

  async logEventOnNativePlatforms(name: string, data: any) {
    const params = name === 'screenview' ? this.prepareScreenview(data) : this.prepareInteraction(data);
    try {
      await FirebaseAnalytics.logEvent({ name, params });
    } catch (e) {
      // error on plugin;
    }
  }
  logEventOnWeb(event: string, params: any) {
    if (!ga) {
      return;
    }
    if (event === 'screenview') {
      ga('set', 'page', params.category || '');
      ga('send', 'pageview', {
        dimension1: params.produto || '',
        dimension2: params.problema || '',
        dimension3: params.previousPage || '',
        dimension4: params.fluxo || '',
        dimension5: params.ddd || '',
        dimension6: params.sessionUUID || ''
      });
      return;
    }
    ga('set', 'eventAction', params.action || '');
    ga('set', 'eventCategory', params.category || '');
    ga('set', 'eventLabel', params.label || '');
    ga('send', 'event', {
      dimension1: params.produto || '',
      dimension2: params.problema || '',
      dimension3: params.previousPage || '',
      dimension4: params.fluxo || '',
      dimension5: params.ddd || '',
      dimension6: params.sessionUUID || '',
      dimension7: params.category || '',
      dimension8: params.action || '',
      dimension9: params.label || '',
    });
  }
  logEvent(event, params) {
    if (this.platform.is('hybrid')) {
      this.logEventOnNativePlatforms(event, params);
      return;
    }
    this.logEventOnWeb(event, params);
  }
}
