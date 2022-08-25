import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationListComponent } from './notification-list.component';
import { of } from 'rxjs';

describe('NotificationListComponent', () => {
  let component: NotificationListComponent;
  let fixture: ComponentFixture<NotificationListComponent>;

  let modalControllerSpy;
  let notificationServiceSpy;

  beforeEach(async(() => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['notificationsRead']);

    TestBed.configureTestingModule({
      declarations: [ NotificationListComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: NotificationService, useValue: notificationServiceSpy},
      ]
    }).compileComponents();
    notificationServiceSpy.notifications = of([]);
    fixture = TestBed.createComponent(NotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit item when notificationClick is called', () => {
    spyOn(component.clickEvent, 'emit');
    component.notificationClick('teste')
    expect(component.clickEvent.emit).toHaveBeenCalledWith('teste');
  });

  it('should call modal dismiss when closeModal is called', () => {
    component.closeModal()
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
  });

  it('should return correct pattern when getDate is called', () => {
    const time = Date.now();
    const date = new Date(time);
    const month = date.toLocaleString('default', { month: 'long' });
    const timePattern = component.getDate(time)
    expect(timePattern).toBe(`${date.getDate()} de ${month}, às ${date.toTimeString().split(':', 2).join(':')}`);
  });
});
