import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuProductListComponent } from './menu/menu-product-list/menu-product-list.component';
import { MenuLoginComponent } from './menu/menu-login/menu-login.component';
import { MenuHeaderComponent } from './menu/menu-header/menu-header.component';
import { MenuComponent } from './menu/menu.component';
import { LocationState } from './states/location.state';
import { DefaultHttpInterceptor } from './core/default-http.interceptor';
import { FeatureState } from './states/feature.state';
import { PendingActionsService } from './services/pending-actions.service';
import { LocalstorageService } from './services/localstorage.service';
import { TimeoutControlService } from './services/timeout-control.service';
import { TicketState } from './states/ticket.state';
import { ProductState } from './states/product.state';
import { UserState } from './states/user.state';
import { ListenAllEventsService } from './services/listen-all-events.service';
import { SharedModule } from './shared/shared.module';
import { ConnectionState } from './states/connection.state';
import { FirebaseAnalyticsService } from './services/firebase-analytics.service';
import { CoreModule } from './core/core.module';
import { FirebasePushService } from './services/firebase-push.service';
import { NetworkService } from './services/network.service';
import { WifiManagerService } from './services/wifi-manager.service';
import { InAppBrowserService } from './services/in-app-browser.service';
import { NativeSettingsService } from './services/native-settings.service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialShareService } from './services/social-share.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ExternalUserState } from './states/externalUser.state';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppState } from './states/app.state';
import { AnalyticsService } from './core/analytics.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SuccessComponent } from './success/success.component';
import { ScreenState } from './states/screen.state';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { SplashscreenService } from './services/splashscreen.service';
import { ScreenOrientationService } from './services/screen-orientation.service';
import { PermissionsService } from './services/permissions.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Badge } from '@ionic-native/badge/ngx';
// locale brasil;
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { PwaUtilityService } from './services/pwa-utility.service';
import { UtilityState } from './states/utility.state';
import { HomeTicketService } from './services/home-ticket.service';
registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent, SuccessComponent, MenuComponent, MenuHeaderComponent, MenuLoginComponent,
    MenuProductListComponent, MenuListComponent],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    SharedModule,
    NgxsModule.forRoot([
      ConnectionState,
      AppState,
      UserState,
      ProductState,
      FeatureState,
      TicketState,
      LocationState,
      ExternalUserState,
      ScreenState,
      UtilityState,
    ], { developmentMode: !environment.production, selectorOptions: { suppressErrors: false } }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    IonicModule.forRoot({
      swipeBackEnabled: false,
      hardwareBackButton: false,
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: (environment.production && environment.isPWA) }),
  ],
  providers: [
    Badge,
    SQLite,
    StatusBar,
    SocialShareService,
    NativeSettingsService,
    OpenNativeSettings,
    InAppBrowserService,
    WifiManagerService,
    NetworkService,
    FirebaseAnalyticsService,
    FirebasePushService,
    ListenAllEventsService,
    AnalyticsService,
    PendingActionsService,
    LocalstorageService,
    TimeoutControlService,
    InAppBrowser,
    OneSignal,
    SplashscreenService,
    ScreenOrientationService,
    PermissionsService,
    PwaUtilityService,
    HomeTicketService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultHttpInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
