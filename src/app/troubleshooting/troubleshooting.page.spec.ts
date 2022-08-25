import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TroubleshootingPage } from './troubleshooting.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { MockRouter } from '../mocks/router.mock';
import { CatalogService } from './catalog.service';
import { TimeoutControlService } from '../services/timeout-control.service';
import { LoginService } from '../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { of, Observable } from 'rxjs';

describe('TroubleshootingPage', () => {
  let component: TroubleshootingPage;
  let fixture: ComponentFixture<TroubleshootingPage>;
  class StoreMock {
    select = jasmine.createSpy().and.callFake(() => of({}));
    selectSnapshot = jasmine.createSpy().and.returnValue({});
  }
  let catalogServiceSpy;
  const router = new MockRouter();
  beforeEach(async(() => {
    catalogServiceSpy = jasmine.createSpyObj('CatalogService', ['init', 'resetHistory', 'getPageLayout', 'publicAnalytics']);

    TestBed.configureTestingModule({
      declarations: [ TroubleshootingPage ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
          {provide: CatalogService, useValue: catalogServiceSpy},
          TimeoutControlService,
          LoginService,
          InAppBrowser,
          {provide: Router, useValue: router},
          {provide: Store, useClass: StoreMock},
      ],
      imports: [
          IonicModule,
          HttpClientModule,
          NgxsModule.forRoot([])
        ]
    }).compileComponents();
    fixture = TestBed.createComponent(TroubleshootingPage);
    catalogServiceSpy.init.and.callFake(() => new Promise<void>((resolve, reject) => {resolve();}));
    catalogServiceSpy.history = [];
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
