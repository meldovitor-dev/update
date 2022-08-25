import { Store } from '@ngxs/store';
import { FeedbackEnum } from './client-feedback.constants';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientFeedbackComponent } from './client-feedback.component';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { EmotionScaleComponent } from './emotion-scale/emotion-scale.component';
import { LeaveButtonsComponent } from './leave-buttons/leave-buttons.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { ProgressionBarComponent } from './progression-bar/progression-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientFeedbackComponent', () => {
  let localStorageSpy;
  let storeSpy;
  let analyticsServiceSpy;
  let component: ClientFeedbackComponent;
  let fixture: ComponentFixture<ClientFeedbackComponent>;

  beforeEach(async(() => {
    localStorageSpy = jasmine.createSpyObj('LocalstorageService', ['setItem']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
    TestBed.configureTestingModule({
      declarations: [ ClientFeedbackComponent , ProgressionBarComponent, EmotionScaleComponent, LeaveButtonsComponent, FeedbackListComponent],
      providers: [{ provide: LocalstorageService, useValue: localStorageSpy },
                  { provide: Store, useValue: storeSpy },
                  { provide: AnalyticsService, useValue: analyticsServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should goToFirstPage be dipatch', () => {
    spyOn(component, 'goToFirstPage').and.callFake(() => {});
    component.ngOnInit();
    expect(component.goToFirstPage).toHaveBeenCalled();
  });

  it('should goToFirstPage set correct variables', () => {
    component.goToFirstPage();
    expect(component.isConclusionStep).toBe(false);
    expect(component.progressionStep).toBe(1);
    expect(component.currentPage.id).toBe(FeedbackEnum.SERVICO);
  });

  it('should capture feedback when button clicked', () => {
    spyOn(component, 'captureFeedback').and.callFake(() => {});
    const btn = {}
    component.buttonClick(btn);
    expect(component.captureFeedback).toHaveBeenCalled();
  });

  it('should not capture feedback when button clicked on conclusion step', () => {
    spyOn(component, 'captureFeedback').and.callFake(() => {});
    const btn = {}
    component.isConclusionStep = true;
    component.buttonClick(btn);
    expect(component.captureFeedback).not.toHaveBeenCalled();
  });

  it('should navAction work corectly', () => {
    spyOn(component, 'updatePage').and.callFake(() => {});
    const action = {call: 'updatePage', params: { id: FeedbackEnum.SERVICO}};
    component.navAction(action);
    expect(component.updatePage).toHaveBeenCalled();
  });

  it('should updatePage work corectly', () => {
    const action = { id: FeedbackEnum.APLICATIVO};
    component.progressionStep = 4;
    component.updatePage(action);
    expect(component.currentPage.id).toBe(FeedbackEnum.APLICATIVO);
    expect(component.progressionStep).toBe(5);
  });

  it('should updateFeedback work corectly', () => {
    const feedback = { gaAction: 'teste', feedback: 4};
    component.updateCurrentSelectedFeedback(feedback);
    expect(component.currentFeedback).toBe(feedback);
  });

  it('should checkAndUpdate work corectly', () => {
    const params = {
      goodFeedback: {
        id: FeedbackEnum.CONCLUSAO,
      },
      badFeedback: {
        id: FeedbackEnum.PROBLEMA,
      },
    }
    spyOn(component, 'updatePage').and.callFake(() => {});
    spyOn(component, 'goToConclusion').and.callFake(() => {});
    component.currentFeedback.feedback = 2;
    component.checkAndUpdate(params);
    expect(component.updatePage).toHaveBeenCalledWith(params.badFeedback);
    component.currentFeedback.feedback = 3;
    component.checkAndUpdate(params);
    expect(component.goToConclusion).toHaveBeenCalledWith(params.goodFeedback);
  });

  it('should goToConclusion work corectly', () => {
    spyOn(component, 'updatePage').and.callFake(() => {});
    spyOn(component, 'resolveStorage').and.callFake(() => {});
    const id = { id:  FeedbackEnum.CONCLUSAO };
    component.goToConclusion(id);
    expect(component.updatePage).toHaveBeenCalledWith(id);
    expect(component.resolveStorage).toHaveBeenCalled();
    expect(component.isConclusionStep).toBe(true);
  });

  it('should first closeButtonClick work corectly', () => {
    spyOn(component, 'updatePage').and.callFake(() => {});
    const id = { id:  FeedbackEnum.SAIR };
    component.closeButtonClick();
    expect(component.updatePage).toHaveBeenCalledWith(id);
    expect(component.isConclusionStep).toBe(true);
  });

  it('should second closeButtonClick work corectly', () => {
    component.isConclusionStep = true;
    spyOn(component, 'dismiss').and.callFake(() => {});
    component.closeButtonClick();
    expect(component.dismiss).toHaveBeenCalled();
  });

  it('dismiss function should emit output closeEvt', () => {
    spyOn(component.closeEvt, 'emit');
    component.dismiss();
    expect(component.closeEvt.emit).toHaveBeenCalledWith(true);
    expect(component.startAnimation).toBe(false);
  });

  it('should captureFeedback call store to dispatch tagueamento', () => {
    const action = { id: FeedbackEnum.APLICATIVO};
    component.updatePage(action);
    component.currentFeedback.feedback = 3;
    component.captureFeedback();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });
  it('should updatePage call store to dispatch tagueamento', () => {
    const action = { id: FeedbackEnum.APLICATIVO};
    component.updatePage(action);
    component.currentFeedback.feedback = 3;
    component.captureFeedback();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });

  it('resolveStorage should set feddback flag in local storage', () => {
    component.resolveStorage();
    expect(localStorageSpy.setItem).toHaveBeenCalledWith('fr', true);
  });

  it('handleLeaveButtonEvt should call navAction', () => {
    const param = 'teste';
    spyOn(component, 'navAction').and.callFake(() => {});
    component.handleLeaveButtonEvt(param);
    expect(component.navAction).toHaveBeenCalledWith(param);
  });

  it('should captureFeedback call analyticsService to send action tagueamento', () => {
    component.currentFeedback.gaAction = 'teste';
    component.captureFeedback();
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalledWith('teste', 'click');
  });
});
