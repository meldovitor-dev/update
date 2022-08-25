import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginSpecialAreaComponent } from './login-special-area.component';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

let analyticsServiceSpy;
xdescribe('LoginSpecialAreaComponent', () => {
  let component: LoginSpecialAreaComponent;
  let fixture: ComponentFixture<LoginSpecialAreaComponent>;
  analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logScreenViewGa']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSpecialAreaComponent ],
      imports: [IonicModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
          provide: AnalyticsService, useValue: analyticsServiceSpy
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSpecialAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
