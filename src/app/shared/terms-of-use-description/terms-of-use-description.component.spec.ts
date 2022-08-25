import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, Platform, ModalController } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TermsOfUseDescriptionComponent } from './terms-of-use-description.component';

describe('TermsOfUseDescriptionComponent', () => {
  let component: TermsOfUseDescriptionComponent;
  let fixture: ComponentFixture<TermsOfUseDescriptionComponent>;

  let paramsSpy;
  let platformSpy;
  let modalControllerSpy;

  beforeEach(async(() => {
    paramsSpy = jasmine.createSpyObj('NavParams', ['get']);
    platformSpy = jasmine.createSpyObj('Platform', ['is']);
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ TermsOfUseDescriptionComponent ],
      providers: [
        { provide: NavParams, useValue: paramsSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: ModalController, useValue: modalControllerSpy },
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsOfUseDescriptionComponent);
    paramsSpy.get.and.callFake(() => 'showPrivacyTerms')
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss when dismiss function is called', () => {
    component.dismiss();
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
  });

  it('should set ios margin when platform is ios', () => {
    platformSpy.is.and.returnValue(true);
    component.ngOnInit();
    expect(component.iosMargin).toBe(true);
  });
});
