import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { NotificationModalComponent } from './notification-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { Store } from '@ngxs/store';
import { NotificationService } from 'src/app/services/notification.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';

describe('NotificationModalComponent', () => {
  let component: NotificationModalComponent;
  let fixture: ComponentFixture<NotificationModalComponent>;

  let storeSpy;
  let modalControllerSpy;
  let analyticsServiceSpy;
  let notificationServiceSpy;
  let iabSpy;

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['notificationsRead']);
    iabSpy = jasmine.createSpyObj('InAppBrowserService', ['goToLink']);

    TestBed.configureTestingModule({
      declarations: [ NotificationModalComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeSpy},
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy},
        { provide: InAppBrowserService, useValue: iabSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
