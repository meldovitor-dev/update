import { AnalyticsService } from './../../core/analytics.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'tecvirt-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss'],
})
export class VideoEmbedComponent implements OnInit {
  constructor(public params: NavParams,
    public modalController: ModalController,
    public as: AnalyticsService) { }
  videoURL = '';
  closeButtonGa;
  ngOnInit() {
    this.videoURL = this.params.get('videoURL');
    this.closeButtonGa = this.params.get('gaCloseButton');
  }
  onClick() {
    this.modalController.dismiss();
    this.as.logEventGA(this.closeButtonGa, 'click');
  }
}
