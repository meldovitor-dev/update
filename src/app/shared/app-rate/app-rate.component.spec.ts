import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRateComponent } from './app-rate.component';
import { ModalController, Platform } from '@ionic/angular';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';
import { APPRATE } from './app-rate.constants';

describe('AppRateComponent', () => {
  let component: AppRateComponent;
  let fixture: ComponentFixture<AppRateComponent>;

  let platformSpy;
  let modalControllerSpy;
  let localStorageSpy;
  let iabSpy;

  const config = APPRATE;

  beforeEach(async(() => {

    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);
    platformSpy = jasmine.createSpyObj('Platform', ['is']);
    localStorageSpy = jasmine.createSpyObj('LocalstorageService', ['setItem']);
    iabSpy = jasmine.createSpyObj('InAppBrowserService', ['createInAppBrowser']);

    TestBed.configureTestingModule({
      declarations: [ AppRateComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: LocalstorageService, useValue: localStorageSpy },
        { provide: InAppBrowserService, useValue: iabSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create in app browser when platform is IOS', () => {
    platformSpy.is.and.returnValue(true);
    component.rateThisApp();
    expect(iabSpy.createInAppBrowser).toHaveBeenCalledWith(config.PLUGIN_PREFERENCES.storeAppURL.ios);
  });

  it('should windows open config when platform is android', () => {
    spyOn(window, 'open');
    platformSpy.is.and.returnValue(false);
    component.rateThisApp();
    expect(window.open).toHaveBeenCalledWith(config.PLUGIN_PREFERENCES.storeAppURL.android, '_system');
  });

  it('should do nothing if action is NOT_NOW when resolveStorage is called', () => {
    spyOn(window, 'open');
    platformSpy.is.and.returnValue(false);
    component.resolveStorage(config.USER_ACTIONS.NOT_NOW);
    expect(localStorageSpy.setItem).not.toHaveBeenCalledWith('ar', true);
  });

  it('should do set ar true if action is not NOT_NOW when resolveStorage is called', () => {
    spyOn(window, 'open');
    platformSpy.is.and.returnValue(false);
    component.resolveStorage(config.USER_ACTIONS.RATE_NOW);
    expect(localStorageSpy.setItem).toHaveBeenCalledWith('ar', true);
  });

  it('should call correct functions when handleButtonClicked is called', () => {
    spyOn(component, 'resolveStorage');
    spyOn(component, 'rateThisApp');
    component.handleButtonClicked(config.USER_ACTIONS.RATE_NOW);
    expect(component.resolveStorage).toHaveBeenCalledWith(config.USER_ACTIONS.RATE_NOW);
    expect(component.rateThisApp).toHaveBeenCalled();
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
  });

  it('should not call correct rateThisApp when handleButtonClicked is called and is not RATE_NOW', () => {
    spyOn(component, 'resolveStorage');
    spyOn(component, 'rateThisApp');
    component.handleButtonClicked(config.USER_ACTIONS.NOT_NOW);
    expect(component.resolveStorage).toHaveBeenCalledWith(config.USER_ACTIONS.NOT_NOW);
    expect(component.rateThisApp).not.toHaveBeenCalled();
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
  });

});
