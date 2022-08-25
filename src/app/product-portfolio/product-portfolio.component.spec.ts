import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProductPortfolioComponent } from './product-portfolio.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SplashscreenService } from 'src/app/services/splashscreen.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { Store } from '@ngxs/store';
import { AnalyticsService } from 'src/app/core/analytics.service';

describe('ProductPortfolioComponent', () => {
  let component: ProductPortfolioComponent;
  let fixture: ComponentFixture<ProductPortfolioComponent>;
  let storeSpy;
  let localstorageServiceSpy;
  let splashscreenServiceSpy;
  let permissionsServiceSpy;
  let routerSpy;
  let analyticsServiceSpy;

  class ActivatedRouteMock {    // Uma maneira de conseguir mockar observables de serviços chamados no construtor
    queryParams = new Observable(observer => {
      const urlParams = {fromDeeplink: 'true', portfolioPresent: 'true', isPositivado: 'true', needsActionContract: 'true'};
      observer.next(urlParams);
      observer.complete();
    });
    params = new Observable(observer => {
      const urlParams = {
        param1: 'some',
        param2: 'params'
      }
      observer.next(urlParams);
      observer.complete();
    });
  }

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot', 'select']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    localstorageServiceSpy = jasmine.createSpyObj('LocalstorageService', ['']);
    splashscreenServiceSpy = jasmine.createSpyObj('SplashscreenService', ['hide']);
    permissionsServiceSpy = jasmine.createSpyObj('PermissionsService', ['init']);

    TestBed.configureTestingModule({
      declarations: [ ProductPortfolioComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LocalstorageService, useValue: localstorageServiceSpy },
        { provide: SplashscreenService, useValue: splashscreenServiceSpy },
        { provide: PermissionsService, useValue: permissionsServiceSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
