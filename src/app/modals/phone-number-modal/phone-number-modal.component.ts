import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-phone-number-modal',
  templateUrl: './phone-number-modal.component.html',
  styleUrls: ['./phone-number-modal.component.scss'],
})
export class PhoneNumberModalComponent implements OnInit {
  phoneNumber = '';
  showText = false;
  constructor(public modalController: ModalController, public params: NavParams) { }

  ngOnInit() {
    this.phoneNumber = this.params.get('phoneNumber');
    this.phoneNumber = this.phoneNumber.replace(/[^0-9]+/, '');
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
