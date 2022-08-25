import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveButtonsComponent } from './leave-buttons.component';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

describe('LeaveButtonsComponent', () => {
  let component: LeaveButtonsComponent;
  let fixture: ComponentFixture<LeaveButtonsComponent>;

  let localStorageSpy;
  let analyticsServiceSpy;

  beforeEach(async(() => {
    localStorageSpy = jasmine.createSpyObj('LocalstorageService', ['setItem']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);

    TestBed.configureTestingModule({
      declarations: [ LeaveButtonsComponent ],
      providers: [
        { provide: LocalstorageService, useValue: localStorageSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
