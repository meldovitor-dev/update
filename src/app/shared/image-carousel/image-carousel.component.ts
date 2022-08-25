import { Store } from '@ngxs/store';
import { VideoEmbedComponent } from './../../modals/video-embed-component/video-embed.component';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ConnectionState } from 'src/app/states/connection.state';
import { CardModalComponent } from 'src/app/modals/card-modal/card-modal.component';
import { CardTypes } from '../cards/card-single/card-catalog';

@Component({
  selector: 'tecvirt-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit, OnChanges {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 0
  };
  slideOptsTwo = {
    initialSlide: 0,
    slidesPerView: 1.5,
    spaceBetween: 0,
  };
  shouldHaveArrow = true;
  isFirst = true;
  isLast = false;
  @Input() sliders = [];
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  constructor(private modalController: ModalController,
              private analyticsService: AnalyticsService,
              private store: Store) { }

  ngOnInit() {
  }
  ngOnChanges(s: SimpleChanges) {
    this.sliders.length > 2 ? this.shouldHaveArrow = true : this.shouldHaveArrow = false;
    this.isFirst = true;
    this.isLast = false;
  }

  itemSelected(s) {
    if (s.call) {
      this[s.call](s);
    }
    this.publishGaAlert(s);
  }
  slideNext(object, slideView) {
    slideView.slideNext(500);
  }
  slidePrev(object, slideView) {
    slideView.slidePrev(500);
  }
  slideDidChange(event, slideView) {
    this.checkIfNavDisabled(slideView);
  }
  checkIfNavDisabled(slideView) {
    this.checkisBeginning(slideView);
    this.checkisEnd(slideView);
  }

  checkisBeginning(slideView) {
    slideView.isBeginning().then((istrue) => {
      this.isFirst = istrue;
    });
  }
  checkisEnd(slideView) {
    slideView.isEnd().then((istrue) => {
      this.isLast = istrue;
    });
  }
  async openModal(params) {
    const connection = this.store.selectSnapshot(ConnectionState.getConnection).connected;
    let component = VideoEmbedComponent;
    let cssClass = 'tec-virt-videoEmbed-modal';
    if (!connection) {
      component = CardModalComponent as any;
      cssClass = 'tec-virt-reduced-modal';
    }
    const modal = await this.modalController.create({
      component,
      cssClass,
      backdropDismiss: true,
      componentProps: {
        videoURL: params.videoURL,
        gaCloseButton: `fechar_video_explicativo_${params.id + 1}`
      }
  });
    await modal.present();
  }
  publishGaAlert(s) {
    const gaAction = `ver_video_explicativo_${s.id + 1}`;
    this.analyticsService.logEventGA(gaAction, 'click');
  }
}
