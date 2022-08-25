import { Store } from '@ngxs/store';
import { NotificationModel } from './../../../models/notification.model';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';


@Component({
  selector: 'tecvirt-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    public notificationService: NotificationService,
    public logg: AnalyticsService,
    public store: Store,
    public iab: InAppBrowserService
  ) { }
  selectedNotification: NotificationModel;
  showUtilityRender = false;
  gaPageName = 'ver_notificacoes';
  ngOnInit() {
    this.publicAnalytics();
  }
  publicAnalytics() {
    const analytics: ScreenStateModel = {
        screenName: this.gaPageName
    };
    this.store.dispatch(new ScreenSet(analytics));
  }
  publicGaAction(notification) {
    const { button } = notification;
    if (button) {
      this.logg.logEventGA(button.gaAction, 'click');
    }
  }
  closeModal() {
    this.modalController.dismiss();
    this.notificationService.notificationsRead();
    this.logg.logEventGA('fechar', 'click');
    this.store.dispatch(new ScreenSet({
      screenName: 'home'
    }));
  }
  closeRender() {
    this.notificationService.notificationsRead();
    this.showUtilityRender = false;
    this.logg.logEventGA('fechar', 'click');
  }
  notificationClick(notification: NotificationModel) {
    this.publicGaAction(notification);
    if (notification && notification.catalog) {
      this.displayCatalog(notification);
      return;
    }
    if (notification && notification.link) {
      this.iab.goToLink(notification.link);
    }
  }
  displayCatalog(notification) {
    this.selectedNotification = notification;
    this.showUtilityRender = true;
  }
}
