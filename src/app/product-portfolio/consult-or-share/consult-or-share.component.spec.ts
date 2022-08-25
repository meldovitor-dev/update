import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PwaUtilityService } from 'src/app/services/pwa-utility.service';
import { ViewmoreButtonComponent } from 'src/app/shared/viewmore-button/viewmore-button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConsultOrShareComponent } from './consult-or-share.component';
import { Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';

describe('ConsultOrShareComponent', () => {
  let storeSpy;
  let analyticsServiceSpy;
  let inAppBrowserSpy;

  let component: ConsultOrShareComponent;
  let fixture: ComponentFixture<ConsultOrShareComponent>;

  const pwaUtilityServicesSpy = jasmine.createSpyObj('PwaUtilityService', ['isPwa']);

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot', 'select']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logScreenViewGa', 'logEventGA']);
    inAppBrowserSpy = jasmine.createSpyObj('InAppBrowserService', ['createInAppBrowser']);

    TestBed.configureTestingModule({
      declarations: [ ConsultOrShareComponent, ViewmoreButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: InAppBrowserService, useValue: inAppBrowserSpy },
        { provide: PwaUtilityService, useValue: pwaUtilityServicesSpy },
        { provide: Store, useValue: storeSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      imports: [HttpClientModule, BrowserAnimationsModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultOrShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
