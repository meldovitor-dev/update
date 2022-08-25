import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, ModalController } from '@ionic/angular';

import { PhoneNumberModalComponent } from './phone-number-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PhoneNumberModalComponent', () => {
  let component: PhoneNumberModalComponent;
  let fixture: ComponentFixture<PhoneNumberModalComponent>;

  let modalControllerSpy;
  let paramsSpy;

  beforeEach(async(() => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']);
    paramsSpy = jasmine.createSpyObj('NavParams', ['get']);

    TestBed.configureTestingModule({
      declarations: [ PhoneNumberModalComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: NavParams, useValue: paramsSpy },
        { provide: ModalController, useValue: modalControllerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneNumberModalComponent);
    paramsSpy.get.and.callFake(()=> '1234')
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
