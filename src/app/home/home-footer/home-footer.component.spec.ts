import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, IonSlides } from '@ionic/angular';
import { HomeFooterComponent } from './home-footer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PendingActionsService } from 'src/app/services/pending-actions.service';
import { NativeSettingsService } from 'src/app/services/native-settings.service';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { of } from 'rxjs';

describe('HomeFooterComponent', () => {
  let component: HomeFooterComponent;
  let fixture: ComponentFixture<HomeFooterComponent>;

  let pasSpy;
  let settingsServiceSpy;
  let analyticsServiceSpy;
  let ionSlidesSpy;

  beforeEach(async(() => {
    pasSpy = jasmine.createSpyObj('PendingActionsService', ['snapshotPendencies', 'pendenciesChanges']);
    settingsServiceSpy = jasmine.createSpyObj('NativeSettingsService', ['openSetting']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
    ionSlidesSpy = jasmine.createSpyObj('IonSlides', ['update']);

    TestBed.configureTestingModule({
      declarations: [ HomeFooterComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PendingActionsService, useValue: pasSpy },
        { provide: NativeSettingsService, useValue: settingsServiceSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ]
    }).compileComponents();

    pasSpy.snapshotPendencies.and.returnValue([{ id: 'doLogin' }]);
    pasSpy.pendenciesChanges.and.returnValue(of([{ id: 'doLogin' }, { id: 'goOnline' }]));
    fixture = TestBed.createComponent(HomeFooterComponent);
    component = fixture.componentInstance;
    component.slidesFooter = ionSlidesSpy;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test pending actions', () => {
    expect(component.pending.priority).toBe(2);
  });

  it('should call function and tagueamento when button has all info, resolvePendingAction', () => {
    const btnMock = {
      action: {
        call: 'goOnline',
        params: undefined,
      },
      gaAction: 'teste'
    };
    spyOn(component, 'goOnline').and.callFake(() => {});
    component.resolvePendingAction(btnMock);
    expect(component.goOnline).toHaveBeenCalled();
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalledWith('teste', 'click');
  });

  it('should call function but no tagueamento when button has no gaAction, resolvePendingAction', () => {
    const btnMock = {
      action: {
        call: 'goOnline',
        params: undefined,
      },
      gaAction: ''
    };
    spyOn(component, 'goOnline').and.callFake(() => {});
    component.resolvePendingAction(btnMock);
    expect(component.goOnline).toHaveBeenCalled();
    expect(analyticsServiceSpy.logEventGA).not.toHaveBeenCalled();
  });

  it('should call NativeSettingsService openSetting when goOnline is called', () => {
    component.goOnline();
    expect(settingsServiceSpy.openSetting).toHaveBeenCalledWith('wifi');
  });
});
