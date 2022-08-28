import { AnalyticsService } from 'src/app/core/analytics.service';
import { Store } from '@ngxs/store';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FeedbackEnum, GET_FEEDBACK_PAGE, FeedbackInterface, } from './client-feedback.constants';
import { trigger, transition, style, animate, state, keyframes, } from '@angular/animations';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';

@Component({
  selector: 'tecvirt-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrls: ['./client-feedback.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateX(300px)',
        })
      ),
      transition('open => closed', [
        animate('0.2s', style({ transform: 'translateX(300px)' })),
      ]),
      transition('closed => open', [
        animate('0.2s', style({ transform: 'translateX(0px)', opacity: 1 })),
      ]),
    ]),
    trigger('fadeInAnimation', [
      transition('* => *', [
        animate(
          '200ms ease-in',
          keyframes([
            style({ opacity: 0, transform: 'scale(0.5)' }),
            style({ opacity: 1, transform: 'scale(1)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ClientFeedbackComponent implements OnInit {
  progressionStep;
  isConclusionStep = false;
  currentPage: FeedbackInterface;
  currentFeedback = { gaAction: undefined, feedback: undefined };
  startAnimation = false;
  togglePage = false;
  @Output() closeEvt = new EventEmitter<any>();
  constructor(public lstorage: LocalstorageService,
    public store: Store,
    public analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.goToFirstPage();
    this.handleAnimation();
  }
  buttonClick(btn) {
    if (!this.isConclusionStep) {
      this.captureFeedback();
    }
    this.navAction(btn.action);
    this.togglePage = !this.togglePage;
  }
  navAction(action) {
    if (action && this[action.call]) {
      this[action.call](action.params);
    }
  }
  updatePage(params) {
    const { id } = params;
    this.currentPage = null;
    this.currentPage = GET_FEEDBACK_PAGE(id);
    this.updateScreenView();
    this.progressionStep++;
  }
  checkAndUpdate(params) {
    this.currentFeedback.feedback >= 3
      ? this.goToConclusion(params.goodFeedback)
      : this.updatePage(params.badFeedback);
  }
  goToFirstPage() {
    this.progressionStep = 1;
    this.isConclusionStep = false;
    this.currentPage = GET_FEEDBACK_PAGE(FeedbackEnum.SERVICO);
    this.updateScreenView();
  }
  goToConclusion(params) {
    const id = { id: FeedbackEnum.CONCLUSAO };
    this.updatePage(id);
    this.resolveStorage();
    this.isConclusionStep = true;
  }
  dismiss() {
    this.closeEvt.emit(true);
    this.startAnimation = false;
  }
  closeButtonClick() {
    this.analyticsService.logEventGA('fechar', 'click');
    if (this.isConclusionStep) {
      this.dismiss();
      return;
    }
    this.updatePage({ id: FeedbackEnum.SAIR });
    this.isConclusionStep = true;
  }
  updateCurrentSelectedFeedback(feedback) {
    this.currentFeedback = feedback;
  }
  captureFeedback() {
    const { gaAction } = this.currentFeedback;
    if (gaAction) {
      this.analyticsService.logEventGA(gaAction, 'click');
    }
  }
  resolveStorage() {
    this.lstorage.setItem('fr', true);
  }
  handleLeaveButtonEvt(evt) {
    this.navAction(evt);
  }
  handleAnimation() {
    const mediaQuery = window.matchMedia('(min-width: 600px)');
    let timeout = 0;
    if (mediaQuery.matches) {
      timeout = 500;
    }
    setTimeout(() => {
      this.startAnimation = true;
    }, timeout);
  }
  updateScreenView() {
    const analytics: ScreenStateModel = {
      screenName: this.currentPage.gaPageName,
    };
    this.store.dispatch(new ScreenSet(analytics));
  }

}
