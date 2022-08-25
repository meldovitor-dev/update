import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingHomeComponent } from './scheduling-home.component';
import { SchedulingService } from '../scheduling.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

let schedulingService;
let router;
let store;
let logg;
xdescribe('SchedulingHomeComponent', () => {
  let component: SchedulingHomeComponent;
  let fixture: ComponentFixture<SchedulingHomeComponent>;
  schedulingService = jasmine.createSpyObj('SchedulingService', ['init']);
  router = jasmine.createSpyObj('Router', ['navigate']);
  store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
  logg = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingHomeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { useValue: schedulingService, provide: SchedulingService },
        { useValue: router, provide: Router },
        { useValue: store, provide: Store },
        { useValue: logg, provide: AnalyticsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
