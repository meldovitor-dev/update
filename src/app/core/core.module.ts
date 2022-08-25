import { IonicModule } from '@ionic/angular';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SecureStorageService } from './secure-storage.service';
import { AnalyticsService } from './analytics.service';
import { MongoAnalyticsService } from './mongo-analytics.service';
import { LoginService } from '../services/login.service';
import { NotificationSQLiteService } from '../services/notification-sqlite.service';
import { CallService } from './../services/call.service';
import { BackgroundService } from './../services/background.service';
import { LocalNotificationService } from './../services/local-notification.service';

const declaredComponents = [
];

@NgModule({
  declarations: [...declaredComponents],
  imports: [CommonModule, HttpClientModule, IonicModule],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        SecureStorageService,
        LoginService,
        AnalyticsService,
        MongoAnalyticsService,
        BackgroundService,
        CallService,
        NotificationSQLiteService,
        LocalNotificationService,
      ],
    };
  }
}
