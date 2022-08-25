import { ModalController, NavParams, Platform } from '@ionic/angular';
import { PRIVACY_TERMS, TERMS } from './terms-of-use-description.constants';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tecvirt-terms-of-use-description',
  templateUrl: './terms-of-use-description.component.html',
  styleUrls: ['./terms-of-use-description.component.scss'],
})
export class TermsOfUseDescriptionComponent implements OnInit {
  gaPageName = 'terms';
  terms = TERMS;
  iosMargin = false;
  privacyTerms = PRIVACY_TERMS;
  showPrivacyTerms;

  constructor(public modalCtrl: ModalController,
              public platform: Platform,
              public params: NavParams) { }

  ngOnInit() {
    if (this.platform.is('ios')) {
      this.iosMargin = true;
    }
    this.showPrivacyTerms = this.params.get('showPrivacyTerms');
    console.log(this.showPrivacyTerms)
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
