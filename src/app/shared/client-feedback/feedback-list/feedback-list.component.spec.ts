import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackListComponent } from './feedback-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FeedbackListComponent', () => {
  let component: FeedbackListComponent;
  let fixture: ComponentFixture<FeedbackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit if has no feedback when getData is called', () => {
    spyOn(component.feedbackEvt, 'emit');
    component.getData('');
    expect(component.feedbackEvt.emit).not.toHaveBeenCalledWith({gaAction: undefined});
  })

  it('should emit feedback when getData is called', () => {
    spyOn(component.feedbackEvt, 'emit');
    component.feedback = 'teste';
    component.getData('');
    expect(component.feedbackEvt.emit).toHaveBeenCalledWith({gaAction: 'teste'});
  })
});
