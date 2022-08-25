/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';

import { ProductState } from '../states/product.state';
import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { NotificationModel } from 'src/app/models/notification.model';
import { SecureStorageService } from './../core/secure-storage.service';
import { FIXED_NOTIFICATIONS } from '../shared/notification-area/notification-catalog';
import { RequestProviderService } from './request-provider.service';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';
import { NotificationSQLiteService } from './notification-sqlite.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  isDatabaseNotificationReady: boolean;
  notifications = new BehaviorSubject<any>(1);
  storageNotifications: NotificationModel[] = [];
  storageNotificationsDatabase: NotificationModel[] = [];
  url = `${TECNICO_VIRTUAL_API.api}/notificacao`;
  MAX_NOTIFICATION_NUMBER = 25;
  imgPath = './../../assets/icon/central-notificacao/';
  currentProductCode: ProductCodeEnum;

  constructor(
    public store: Store,
    private platform: Platform,
    public storage: SecureStorageService,
    public http: RequestProviderService,
    private notificationDatabase: NotificationSQLiteService) {
    this.notifications.next([]);
  }

  init() {
    this.store.select(ProductState.getCurrentProduct).subscribe(product => {
      if (!product) {return;}
      this.currentProductCode = product.productCode;
      this.fetchStaticDataSource();
    });
    if (this.platform.is('hybrid')) {
      this.notificationDatabase.init();
      this.fetchSQLiteDataSource();
    }
  }

  fetchStaticDataSource() {
    let staticNotifications = FIXED_NOTIFICATIONS;
    staticNotifications = this.addIconPath(staticNotifications);
    this.publishToObservables(staticNotifications);
  }

  fetchSQLiteDataSource() {
    this.notificationDatabase.getDatabaseState().subscribe(isDatabaseReady => {
      if (isDatabaseReady) {
        this.notificationDatabase.getInternalNotifications().subscribe(notifications => {
          this.storageNotificationsDatabase = notifications;
        });
      }
    });
  }

  filterByProduct(notifications: NotificationModel[]) {
    return notifications.filter(el => el.products.includes(this.currentProductCode));
  }

  async publishToObservables(notifications) {
    const storageData = await this.getNotificationsFromStorage();
    let notificationArray = this.notifications.getValue();
    notificationArray = this.concatUniqueNotifications(notificationArray, notifications);
    notificationArray = this.concatUniqueNotifications(notificationArray, this.storageNotificationsDatabase);
    notificationArray = this.filterByProduct(notificationArray);
    notificationArray = this.syncStorage(notificationArray, storageData);
    notificationArray = this.prioritize(notificationArray);
    notificationArray = this.checkValidDate(notificationArray);
    this.notifications.next(notificationArray);
  }
  concatUniqueNotifications(arr1: NotificationModel[], arr2: NotificationModel[]) {
    const newArray = arr1;
    arr2.forEach(el => {
      if (newArray.find(element => element.id === el.id)) {
        return;
      }
      newArray.push(el);
    });
    return newArray;
  }
  prioritize(array: NotificationModel[]) {
    array.sort((a, b) => a.creationDate >= b.creationDate ? 1 : -1);
    array = this.sortNotifications(array);
    array = array.slice(0, this.MAX_NOTIFICATION_NUMBER);
    return array;
  }
  syncStorage(notifications: NotificationModel[], storageNotifications) {
    return [
      ...notifications.map(el => {
        if (storageNotifications.find(element => element === el.id)) {
          el.unread = false;
        }
        return el;
      })
    ];
  }
  sortNotifications(arr) {
    return arr.sort((a, b) => a.unread - b.unread).reverse();
  }
  addIconPath(notifications: NotificationModel[]) {
    notifications.forEach(noti => {
      if (noti.icon && !noti.icon.includes('.svg')) {
        noti.icon = this.imgPath + noti.icon + '.svg';
      }
    });
    return notifications;
  }
  async fetchNotifications() {
    try {
      const tr = await this.http.get(this.url, {}).toPromise();
      let fetchedNotifications = this.setUnreadInArray(tr);
      fetchedNotifications = this.addIconPath(fetchedNotifications);
      this.publishToObservables(fetchedNotifications);
    } catch (e) {
      console.log('error ==> ', e);
    }
  }
  setUnreadInArray(arr): NotificationModel[] {
    return arr.map(el => ({
        ...el,
        unread: true,
      }));
  }

  getNotificationsCountUnread(notifications = []) {
    return (notifications || []).filter(el => (el && el.unread)).length;
  }

  notificationsRead() {
    const read = this.notifications.getValue();
    read.map(el => el.unread = false);
    this.notifications.next(read);
    const readId = read.map(el => el.id);
    this.storageNotifications.forEach(el => {
      if (readId.find(element => element === el)) {
        return;
      }
      readId.push(el);
    });
    this.storage.set('notification-messages', JSON.stringify(readId));

    for (const notification of this.storageNotificationsDatabase) {
      notification.unread = false;
      this.notificationDatabase.markInternalNotificationAsRead(notification);
    }
  }

  getNotificationsFromStorage() {
    let nots = [];
    return new Promise<any>((resolve, reject) => {
      this.storage.get('notification-messages').then(res => {
        if (res.match(/^\[.*\]$/g)) {
          nots = JSON.parse(res);
          this.storageNotifications = nots;
        }
        return resolve(nots);
      }).catch(e => {
        console.error(e);
        return resolve(e);
      });
    });
  }
  verifyNotification(notifications) {
    const requiredProperties = ['id', 'title', 'paragraph', 'creationDate', 'unread'];
    let verifiedNotifications = notifications.filter(el => requiredProperties.every( noti => el.hasOwnProperty(noti)));
    verifiedNotifications = verifiedNotifications.filter(this.checkDate);
    return verifiedNotifications;
  }

  checkDate(notification) {
    if ( !notification.expirationDate ) {
      return true;
    }
    const today = new Date(Date.now());
    if ( today.getTime() > notification.expirationDate ) {
      return false;
    }
    return true;
  }
  checkValidDate(notifications) {
    return notifications.filter(this.checkDate);
  }
}
