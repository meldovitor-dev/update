import { Store } from '@ngxs/store';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CARD_MODAL } from 'src/app/shared/cards/card-single/card-catalog';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';
import { NativeSettingsService } from 'src/app/services/native-settings.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {
  title = '';
  paragraph: string;
  gaName = '';
  button;
  constructor(private modalController: ModalController,
    public params: NavParams,
    public store: Store,
    public nativeSet: NativeSettingsService) { }

  ngOnInit() {
    const id = this.params.get('cardType');
    this.getModal(id);
    this.publicAnalytics();
  }
  getModal(id) {
    const modal = CARD_MODAL.find(el => el.id === id);
    this.title = modal.title;
    this.paragraph = modal.paragraph;
    this.gaName = modal.gaName;
    this.button = modal.button;
  }
  dismiss() {
    this.modalController.dismiss();
  }
  publicAnalytics() {
    const analytics: ScreenStateModel = {
      screenName: this.gaName
    };
    this.store.dispatch(new ScreenSet(analytics));
  }
  actionButton(button) {
    const { action, params } = button;
    this[button.action](params);
  }
  openWifi(params) {
    this.nativeSet.openSetting('wifi');
  }
}
