import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StbListComponent } from './stb-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/core/analytics.service';

describe('StbListComponent', () => {
  let component: StbListComponent;
  let fixture: ComponentFixture<StbListComponent>;

  let modalControllerSpy;
  let analyticsServiceSpy;

  beforeEach(async(() => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);

    TestBed.configureTestingModule({
      declarations: [ StbListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
