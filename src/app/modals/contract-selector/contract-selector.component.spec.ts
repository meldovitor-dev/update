import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { ContractSelectorComponent } from './contract-selector.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { Store } from '@ngxs/store';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';

describe('ContractSelectorComponent', () => {
  let component: ContractSelectorComponent;
  let fixture: ComponentFixture<ContractSelectorComponent>;

  let modalControllerSpy;
  let analyticsServiceSpy;
  let storeSpy;
  let injectorSpy;

  beforeEach(async(() => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
    injectorSpy = jasmine.createSpyObj('Injector', ['']);
    TestBed.configureTestingModule({
      declarations: [ ContractSelectorComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: Store, useValue: storeSpy},
        { provide: InAppBrowserService, useValue: injectorSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
