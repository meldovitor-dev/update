import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { WizardComponent } from './wizard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SplashscreenService } from 'src/app/services/splashscreen.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { Store } from '@ngxs/store';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { WizardDotsComponent } from './wizard-dots/wizard-dots.component';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;
  let storeSpy;
  let localstorageServiceSpy;
  let splashscreenServiceSpy;
  let permissionsServiceSpy;
  let routerSpy;

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot', 'select']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    localstorageServiceSpy = jasmine.createSpyObj('LocalstorageService', ['']);
    splashscreenServiceSpy = jasmine.createSpyObj('SplashscreenService', ['hide']);
    permissionsServiceSpy = jasmine.createSpyObj('PermissionsService', ['init']);

    TestBed.configureTestingModule({
      declarations: [ WizardComponent, ButtonComponent, WizardDotsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LocalstorageService, useValue: localstorageServiceSpy },
        { provide: SplashscreenService, useValue: splashscreenServiceSpy },
        { provide: PermissionsService, useValue: permissionsServiceSpy },
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
