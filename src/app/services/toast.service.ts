import { ToastTypes } from './../models/toast.model';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ToastModel } from '../models/toast.model';
import { AnalyticsService } from '../core/analytics.service';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController,
    public loggProvider: AnalyticsService) { }

  async presentToast(options: ToastModel) {
    this.publishGaAction(options.gaAction, 'visualizou');
    const toast = await this.toastController.create({
      message: `<ion-icon name="${this.getToastInfos(options.type).icon}"></ion-icon>  ${options.message}`,
      position: (options.position || 'top'),
      duration: (options.duration || 2000),
      color: this.getToastInfos(options.type).color,
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        }
      ]
    });
    toast.present();


  }
  getToastInfos(optionType: ToastTypes) {
    const data = {
      [ToastTypes.SUCCESS]: { icon: 'ios-checkmark-circle', color: 'info' },
      [ToastTypes.ERROR]: { icon: 'ios-close-circle-outline', color: 'error' },
      [ToastTypes.ALERT]: { icon: '', color: '' },
      [ToastTypes.HELP]: { icon: '', color: '' },
      [ToastTypes.INFO]: { icon: '', color: '' },
      [ToastTypes.BLOCK]: { icon: '', color: '' },
      [ToastTypes.DARK]: { icon: '', color: 'dark' },
    };
    return data[optionType] || { icon: '', color: '' };
  }
  publishGaAction(evt: string, label = 'click') {
    this.loggProvider.logEventGA(evt, label);
  }
}
