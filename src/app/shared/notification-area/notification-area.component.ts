import { AnalyticsService } from './../../core/analytics.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'tecvirt-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.scss'],
})
export class NotificationAreaComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    public notificationService: NotificationService,
    public logg: AnalyticsService
  ) { }

  ngOnInit() {
  }
  onClick() {
    this.presentModal();
    this.logg.logEventGA('abrir-notificacoes', 'click');
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NotificationModalComponent
    });
    await modal.present();
    return;
  }
}
