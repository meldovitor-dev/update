import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { App } from '@capacitor/app';
import { BackgroundTask } from '@capawesome/capacitor-background-task';

import { AnalyticsService } from '../core/analytics.service';
import { ScreenState } from '../states/screen.state';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  public getAppVisibility = new Subject<boolean>();
  public onResume = new Subject<boolean>();
  public onPause = new Subject<boolean>();

  constructor(
    public store: Store,
    public analyticsService: AnalyticsService) {
    this.initListen();
  }

  private initListen() {
    window.document.addEventListener('visibilitychange', (e) => {
      const visible = window.document.visibilityState;
      const isVisisible = (visible === 'visible');
      this.getAppVisibility.next(isVisisible);
    });
    window.document.addEventListener('deviceready', () => {
      console.log('🏎 the device is ready!');
      this.registerDeviceListener();
    }, false);
  }

  private registerDeviceListener() {
    window.document.addEventListener('pause', () => {
      this.publishToGA('entrou');
      console.log('🖐 on pause called');
      this.onPause.next(true);
    }, false);
    window.document.addEventListener('resume', () => {
      this.publishToGA('voltou');
      console.log('🚀 on ready called');
      this.onResume.next(true);
    }, false);
  }

  private publishToGA(label) {
    const ignoredPagesGA = ['selecao_produto', 'home'];
    const actualPage = this.store.selectSnapshot(ScreenState.getScreen);

    if (!ignoredPagesGA.includes(actualPage.screenName)) {
      this.analyticsService.logEventGA('app_background', label);
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/ban-types
  public executeBackgroundTask(task: Function) {
    App.addListener('appStateChange', async (state) => {
      if (!state.isActive) {
        const taskId = await BackgroundTask.beforeExit(async () => {
          await task();
          BackgroundTask.finish({ taskId });
        });
      }
    });
  }
}
