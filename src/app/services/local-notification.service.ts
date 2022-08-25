/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { BackgroundService } from './background.service';

export type LocalNotification = {
  title: string;
  text: string;
  seconds: number;
};

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(private backgroundService: BackgroundService, private platform: Platform) {
    this.backgroundService.onResume.subscribe(() => this.cancelAll());
  }

  public async schedule(notification: LocalNotification, id?) {
    try {
      await LocalNotifications.schedule({
        notifications: [{
          id: id || 1,
          title: notification.title,
          body: notification.text,
          schedule: { at: new Date(Date.now() + 1000 * (notification.seconds + 8)) },
          sound: this.setSound()
        }]
      });
      console.log(`Notificação local agendada: ${id || 1}`);
    } catch (error) {
      console.error(`Erro ao agendar envio de notificação local => ${id || 1}`);
    }
  }

  public async cancel(id: any): Promise<void> {
    try {
      String(id);
      await LocalNotifications.cancel({ notifications: [{ id }] });
      console.info(`Notificação local com id ${id} cancelada`);
    } catch (error) {
      console.error(`Erro ao criar notificação local => ${id}`, error);
    }
  }

  public async cancelAll() {
    const pendingNotifications = await LocalNotifications.getPending();

    if (pendingNotifications && pendingNotifications.notifications.length > 0) {
      await LocalNotifications.cancel(pendingNotifications);
      console.debug('Todas as notificações locais pendentes foram canceladas.');
    }
  }

  private setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/shame.mp3';
    } else {
      return 'file://assets/sounds/bell.mp3';
    }
  }
}
