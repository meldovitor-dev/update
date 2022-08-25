import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AntiRobotComponent } from './../modals/anti-robot/anti-robot.component';

@Injectable({
  providedIn: 'root'
})
export class AntirobotService {

  constructor(public modalCtrl: ModalController) { }

  public async presentModal() {
    const isModalOpened = await this.modalCtrl.getTop();
    if (isModalOpened) {
      this.modalCtrl.dismiss();
    }
    const modal = await this.modalCtrl.create({
      component: AntiRobotComponent,
      cssClass: 'tec-virt-reduced-modal',
    });
    await modal.present();
  }
}
