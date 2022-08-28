import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { SecureStorageService } from './secure-storage.service';
import { AnalyticsService } from './analytics.service';
import { MongoAnalyticsService } from './mongo-analytics.service';
import { LoginService } from '../services/login.service';
import { NotificationSQLiteService } from '../services/notification-sqlite.service';
import { CallService } from './../services/call.service';
import { BackgroundService } from './../services/background.service';
import { LocalNotificationService } from './../services/local-notification.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule
  ],
  declarations: []
})
export class CorePageModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CorePageModule,
      providers: [
        SecureStorageService,
        LoginService,
        AnalyticsService,
        MongoAnalyticsService,
        BackgroundService,
        CallService,
        NotificationSQLiteService,
        LocalNotificationService
      ],
    };
  }
}
