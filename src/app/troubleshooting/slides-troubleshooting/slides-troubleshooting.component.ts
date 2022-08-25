import { AnalyticsService } from './../../core/analytics.service';
import { Store } from '@ngxs/store';
import { Subject, Observable } from 'rxjs';
import { SlidesTroubleshootingModel } from './slides-troubleshooting.model';
import { Component, OnInit, Input, AfterContentInit, ViewChild } from '@angular/core';
import { DIRECTIONS } from '../general.constants';
import {
    trigger,
    style,
    state,
    animate,
    transition,
    keyframes
} from '@angular/animations';
import { SubSink } from 'subsink';
import { ScreenSet } from 'src/app/actions/screen.actions';
@Component({
    selector: 'tecvirt-slides-troubleshooting',
    templateUrl: './slides-troubleshooting.component.html',
    styleUrls: ['./slides-troubleshooting.component.scss'],
    animations: [
        trigger('fadeInAnimation', [
            transition('* => *', [
                animate('500ms ease-in', keyframes([
                    style({ opacity: 0, transform: 'scale(0.5)' }),
                    style({ opacity: 1, transform: 'scale(1)' })
                ]))
            ]),
        ]),
    ]

})
export class SlidesTroubleshootingComponent implements OnInit, AfterContentInit {
    @Input() slides: any;
    @Input() changeSlidesFromOutside: Observable<any>;
    pages = [];
    hasMenuSection;
    togglePic = false;
    fullSlideMode = false;
    thumbImage;
    hideHint = true;
    hideHintTimeout;
    fadeInFullImage = false;
    fadeInTimeout;
    fullImage;
    headerItems = [];
    currentSlide = 0;
    feedbackReports = [];
    fadeControl = true;
    currentGaPageName = '';
    hasBottomSectionElements: boolean;
    gaPageName = '';
    subscriptions = new SubSink();
    public $changeSlides: Subject<boolean> = new Subject<boolean>();
    @ViewChild('SliderRender', { static: true }) public slider: any;

    constructor(private store: Store, private analyticsService: AnalyticsService) { }

    ngOnInit() { }
    ngAfterContentInit(): void {
        const els = this.getSlides();
        if (els.find(el => !!el.section)) {
            this.hasMenuSection = true;
        }
        els.map((el, idx) => {
            this.headerItems.push({
                gaLabel: el.gaLabel,
                section: el.section,
                description: el.label,
                id: idx,
            });
            this.pages.push(new SlidesTroubleshootingModel(el));
            this.feedbackReports.push(
                false,
            );
        });
        this.populateImages(0);
        this.slides = this.pages.length;
        this.gaPageName = this.pages[0] ? this.pages[0].getGa() : '';
        this.dispatchPageGA();
        this.listenEventsChangePage();
    }
    listenEventsChangePage() {
        if (!this.changeSlidesFromOutside) {
            return;
        }
        this.changeSlidesFromOutside.subscribe(data => {
            const { id } = data;
            const { gaLabel } = data;
            this.dispatchEventGA(gaLabel);
            this.navigateTo(id);
        });
    }
    async slideHandler(evt) {
        this.currentSlide = await this.slider.getActiveIndex();
        this.populateImages(this.currentSlide);
        this.dispatchPageGA();
        // this.$changeSlides.next(this.getReportStatus());
    }
    dispatchPageGA() {
      const currentPageSlide = this.pages[this.currentSlide].slide;
      const { ga } = currentPageSlide;
      if (ga) {
        this.store.dispatch(new ScreenSet({
          screenName: ga,
        }));
      }
    }
    dispatchEventGA(gaLabel) {
      if (!gaLabel) {
        return;
      }
      this.analyticsService.logEventGA(gaLabel, 'click');
    }
    getSlides() {
        return JSON.parse(JSON.stringify((this.slides || [])));
    }
    public setFullSlideMode(idx) {
        this.fullSlideMode = this.pages[idx] ? this.pages[idx].isFullSlideMode() : false;
    }
    public populateImages(idx) {
        this.setFullSlideMode(idx);
        this.togglePic = false;
        if (!this.pages[idx]) {
            return;
        }
        const images = this.pages[idx].getBottomImages();
        if (idx) {
            this.hideHint = true;
        }
        if (images.length) {
            this.hasBottomSectionElements = true;
            this.fullImage = images[0];
        }
        if (images.length > 1) {
            this.thumbImage = images[1];
            return;
        }
        this.thumbImage = undefined;
    }

    public hasBottomSection() {
        return this.hasBottomSectionElements;
    }
    public isFullSlideMode() {
        return this.fullSlideMode;
    }
    public hasThumbnail(): boolean {
        return !!this.thumbImage;
    }
    public togglePicture() {
        this.togglePic = !this.togglePic;
        const old = this.fullImage;
        this.fullImage = this.thumbImage;
        this.thumbImage = old;
    }
    public getCurrentSlide() {
        return this.currentSlide;
    }
    getTotalSlides() {
        return (this.pages.length || 1) - 1;
    }
    public navegateButtonClicked(event) {
        if (event === DIRECTIONS.FOWARD) {
            this.slider.slideNext();
        }
        if (event === DIRECTIONS.BACK) {
            this.slider.slidePrev();
        }
    }
    public navigateTo(pageId: number) {
        this.slider.slideTo(pageId);
    }
}
