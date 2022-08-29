import { ServerMaintenanceService } from './services/server-maintenance.service';
import { Store } from '@ngxs/store';
import { Platform } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { App } from '@capacitor/app';
import { filter, switchMap } from 'rxjs/operators';
import { Component, NgZone } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UtilityState } from 'src/app/states/utility.state';
import { DeleteTicketAction } from './actions/ticket.actions';
import { FeatureState } from './states/feature.state';
import { InteractionEnum } from './domain/interactions';
import { ProductConfigSet } from './actions/product.action';
import { FeatureUnset } from './actions/feature.action';
import { UserState } from './states/user.state';
import { ConnectionChange } from './actions/connection.actions';
import { ConnectionModel } from './models/connection.model';
import { AppSet } from './actions/app.actions';
import { ProductState } from './states/product.state';
import { AnalyticsService } from './core/analytics.service';
import { ScreenState } from './states/screen.state';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { UserSessionSet } from './actions/user.actions';
import { NotificationService } from './services/notification.service';
import { PendingActionsService } from 'src/app/services/pending-actions.service';
import { ProductService } from './services/product.service';
import { LoginService } from './services/login.service';
import { NetworkService } from './services/network.service';
import { FirebasePushService } from './services/firebase-push.service';
import { DeeplinkService } from './services/deeplink.service';
import { AppsflyerService } from './services/appsflyer.service';
import { ScreenOrientationService } from './services/screen-orientation.service';
import { DeviceService } from './services/device.service';
import { PwaUtilityService } from './services/pwa-utility.service';
import { environment } from 'src/environments/environment';
import { BackgroundService } from './services/background.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  deeplinkparams;
    isDatabaseNotificationReady: boolean;
    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        public firebasePushService: FirebasePushService,
        public ns: NetworkService,
        public store: Store,
        public router: Router,
        public loginService: LoginService,
        public productService: ProductService,
        public pas: PendingActionsService,
        public deeplinkService: DeeplinkService,
        public analyticsService: AnalyticsService,
        public onesignal: OneSignal,
        public appsflyer: AppsflyerService,
        public screenOrientation: ScreenOrientationService,
        public device: DeviceService,
        public pwaUtility: PwaUtilityService,
        public notificationService: NotificationService,
        public backgroundService: BackgroundService,
        public zone: NgZone,
        public serverMaintenanceService: ServerMaintenanceService
    ) {
        this.initializeURLParams();
        this.initializeApp();
    }
    ngOnInit() {
        this.router.navigate(['']);
        this.resolveDeeplinks();
    }
    resolveDeeplinks() {
        const params = this.deeplinkparams;
        if (!params || !params.payload) {
            return;
        }
        try {
            const payload = JSON.parse(params.payload);
            if (payload.portfolio) {
                this.loginService.handlePortfolioMinhaOiDeeplink(payload.portfolio, payload.isPositivado);
            }
        } catch (e) {
            return;
        }
    }
    public initializeURLParams() {
      this.deeplinkService.initializeURLParams(window.location);
    }
    public initializeApp() {
        // this.registerDeeplinkParams();
        this.handlerDeeplink();
        this.platform.ready().then(async () => {
            this.disableSwipeEvent();
            this.disableConsoleLog();
            this.statusBar.styleDefault();
            this.firebasePushService.register();
            this.appsflyer.initSdk();
            this.onesignalRegister();
            this.publishVersionAndChannel();
            this.connectionStatusInitialize();
            this.analyticsHandler();
            this.handlerUserChanges(); // observables for user changes
            this.handlerTicketChanges(); // observable for ticketChanges
            this.handlerFeatureChanges(); // observable for changeFeatures
            this.handlerProductChanges(); // observable for changeProduct
            this.handlerScreenChanges(); // observable for Screen -> publish GA
            this.handlerListenNavigationEnd();
            this.lockOrientation();
            this.disableSwipeEvent();
            this.serverMaintenanceService.init(); // controll GMUD downtime
            this.pas.init();
            this.pwaUtility.init(); // pwa check service works
            this.notificationService.init();
        });
    }
    /**
     * Force screen to portrait orientation
     */
    public lockOrientation() {
        this.screenOrientation.init();
    }
    /**
     * Disable hardware back button
     */
    public disableSwipeEvent() {
        // tslint:disable-next-line: no-shadowed-variable
        App.addListener('backButton', (info: any) => {
            // remove Default app button behavior
        });
    }
    /**
     * Disable console log on production builds
     */
    public disableConsoleLog() {
        if (environment.DISABLE_CONSOLE) {
            window.console.log = () => {};
            window.console.error = () => {};
            window.console.table = () => {};
            window.console.warn = () => {};
            window.console.debug = () => {};
            window.console.info = () => {};
        }
    }
    public onesignalRegister() {
        if (!this.platform.is('hybrid')) return;
        this.onesignal.startInit(environment.CREDENTIALS.onesignal, environment.CREDENTIALS.firebase);
        this.onesignal.handleNotificationOpened().subscribe(data => {
            console.log('🚀 open notification ==>', data);
        });
        this.onesignal.handleNotificationReceived().subscribe(data => {
            console.log('🚀 received notification ==>', data);
        });
        this.onesignal.getIds().then(credentials => {
            if (!!credentials) {
                const { userId } = credentials;
                this.loginService.oneSignal = userId;
            }
        });
        this.onesignal.endInit();
    }
    registerDeeplinkParams() {
        const url = window.location.href;
        if (!url || url.split('?').length < 2) {
            return;
        }
        const params = new URLSearchParams(url.split('?')[1]);
        try {
            const payload = params.get('payload');
            if (!payload) {
                return;
            }
            this.deeplinkparams = {
                payload
            };
        } catch (e) {
            console.log('invalid payload');
        }
    }

    publishVersionAndChannel() {
        const channel = this.platform.is('hybrid') ? environment.CANAIS.APP : environment.CANAIS.WEB;
        const deviceInfo = this.device.getAppVersion();
        deviceInfo.then(app => {
            const version = app.appVersion;
            const formatedVersion = app.formatedVersion;
            const build = app.appBuild;
            this.store.dispatch(new AppSet({
                channel,
                version,
                formatedVersion,
                build
            }));
        }).catch(e => {
            // e
        });
    }

    handlerScreenChanges() {
        this.store.select(ScreenState.getScreen).subscribe(app => {
            const { screenName } = app;
            if (screenName) {
                this.analyticsService.logScreenViewGa(screenName);
            }
        });
    }
    public handlerFeatureChanges() {
        this.store.select(FeatureState.getFeature).subscribe(feature => {
            // TODO adapt diagnostic interaction to interate one array
            if (feature) {
                const interactions = [
                    ...(feature.interactions || []),
                    ...(feature.diagnostic || []),
                ];
                interactions.forEach(element => {
                    this.store.dispatch(new DeleteTicketAction(element));
                });
            }
        });
    }
    public handlerListenNavigationEnd() {
        this.router.events.subscribe(evt => {
            if (evt instanceof NavigationEnd) {
                this.resolveNavigateEndExceptions(evt);
            }
        });
    }
    resolveNavigateEndExceptions(evt) {
        const { url } = evt;
        if (!url || !url.length) {
            return;
        }
        if (url.includes('home') && !url.includes('home/')) {
            this.store.dispatch(new FeatureUnset());
        }
    }

    handlerTicketChanges() {
        // handler ticket changes
    }

    public getTimeout(interactionId: InteractionEnum) {
        const { timeout_ms } = this.productService.getConfigFromInteraction(interactionId);
        return timeout_ms;
    }

    routerActived(evt) {
        const { gaPageName } = evt;
        // event interceptor
    }
    public analyticsHandler() {
        // LISTEN FOR PUBLISH GA EVENTS AND REDIRECT!
    }
    public async connectionStatusInitialize() {
        const filter = (status) => {
            let result = status;
            if (this.platform.is('android') && this.platform.is('hybrid')) {
                return result;
            }
            if ( status.connected ) {
                result.connectionType = 'Online';
            }
            return result;
        };
        try {
            const result = await this.ns.getStateConnection();
            this.store.dispatch(new ConnectionChange(filter(result)));
        } catch (error) {
            console.log('connectionStatusInitialize.error', error);
        }
        this.ns.listenNetwork((status: ConnectionModel) => {
            console.log('connectionStatusInitialize.status', status);
            this.store.dispatch(new ConnectionChange(filter(status)));
        });
    }
    handlerProductChanges() {
        this.store.select(ProductState)
        .pipe(
            filter(prd => !!prd.product),
            switchMap(p => this.store.dispatch(new UserSessionSet(p.productCode)))
        )
        .subscribe(product => {
            this.fetchConfig();
        });
    }
    /**
     * Observable for user login
     */
    public handlerUserChanges() {
        this.store.select(UserState.getUser).subscribe(async usr => {
            if (!usr) {
                return;
            }
            if ( this.loginService.isLoggedIn() ) {
                this.notificationService.fetchNotifications();
            }
        });
    }
    public async fetchConfig() {
        const config = this.store.selectSnapshot(ProductState.getConfig);
        // console.log('🛫', {alreadyHasConfig: !!config},
        // {logado: this.loginService.isLoggedIn()},
        // 'will config be fetch? =>', (!!config || !this.loginService.isLoggedIn()) ? 'no' : 'yes');
        if (!!config || !this.loginService.isLoggedIn()) {
            return;
        }
        try {
            const result = await this.productService.fetchConfig().toPromise();
            await this.store.dispatch(new ProductConfigSet(result));
        } catch (e) {
            // TODO reScheduler a task to retake a product service config as a exautMap rxjs
        }
        return;
    }
    async handlerDeeplink() {
      const params = this.store.selectSnapshot(UtilityState.getUrlParams);
      if (this.platform.is('desktop') && Object.keys(params || {}).length) {
        await this.deeplinkService.handlerDeeplink(window.location.href);
      }
      App.addListener('appUrlOpen', (data: any) => {
          this.zone.run(async () => {
              await this.deeplinkService.handlerDeeplink(data.url);
          });
      });
    }
}
