import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WifiInfoResultComponent } from './wifi-info-result.component';
import { Store } from '@ngxs/store';
import { WifiManagerService } from 'src/app/services/wifi-manager.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

describe('WifiInfoResultComponent', () => {
  let component: WifiInfoResultComponent;
  let fixture: ComponentFixture<WifiInfoResultComponent>;

  const wifiInfoMock = {
    isRede5Ghz: false,
    isCompatible5Ghz: true,
    velocidadeAparelho: '100Mbps',
    nomeDaRede: 'nome da rede',
    planoContratado: 'Banda Larga 200Mbps',
    bssid: 'B5-52-2D-2F-A9-CC',
    macAddress: 'B5-52-2D-2F-A9-CC',
    RSSI: -30,
    bandWidth: 2,
    rssiOtimo: true
  };
  let wifiServiceSpy;
  let inAppBrowserSpy;
  class StoreMock {
    // How we did it before
    selectSnapshot =  jasmine.createSpy().and.returnValue({nomeDoPlano: 'Banda Larga 50MBps'});
    dispatch = jasmine.createSpy();
  }

  beforeEach(async(() => {
    wifiServiceSpy = jasmine.createSpyObj('WifiManagerService', ['is5GHzBandSupported']);
    inAppBrowserSpy = jasmine.createSpyObj('RequestProviderService', ['create']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useClass: StoreMock},
        { provide: WifiManagerService, useValue: wifiServiceSpy },
        { provide: InAppBrowser, useValue: inAppBrowserSpy },
      ],
      declarations: [ WifiInfoResultComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiInfoResultComponent);
    component = fixture.componentInstance;
    component.wifiInfo = wifiInfoMock;
    wifiServiceSpy.wifiInfo$ = {value: wifiInfoMock};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sanitize correct speed for velocidadeContratada', () => {
    const speed = component.getSanitizedPlano();
    expect(speed).toEqual('50 Mega');
  });

  // it('should capture correct info in captureWifiInfo', async () => {
  //   const logObj = {
  //     ...wifiInfoMock,
  //     ...deviceInfo
  //   };
  //   spyOn(component, 'createBasicAnalyticsObj').and.returnValue(logObj);
  //   spyOn(component, 'logWifiInfo');
  //   await component.captureWifiInfo();
  //   expect(component.createBasicAnalyticsObj).toHaveBeenCalled();
  //   expect(component.logWifiInfo).toHaveBeenCalledWith(logObj);
  // });

  // it('should send correctly to Backend with logWifiInfo', async () => {
  //   const url = `${environment.TECNICO_VIRTUAL_API}/device/wifiInfo`;
  //   const logObj = {
  //     ...wifiInfoMock,
  //     ...deviceInfo
  //   };
  //   await component.wifiInfo(logObj);
  //   expect(reqSpy.post).toHaveBeenCalledWith(url, logObj, undefined);
  // });

  // it('should createBasicAnalyticsObj correctly return object', () => {
  //   const logObj = {
  //     ...wifiInfoMock,
  //     ...deviceInfo
  //   };
  //   const result = component.createBasicAnalyticsObj(deviceInfo);
  //   expect(result).toEqual(logObj);
  // });


});
