import { ProductIdentifierEnum } from './../../enums/product.enum';
import { AnalyticsService } from './../../core/analytics.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController, Platform } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SecureStorageService } from 'src/app/core/secure-storage.service';
import { Store } from '@ngxs/store';
// import { ReCaptchaV3Service } from 'ng-recaptcha';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { TecnologyEnum } from 'src/app/enums/tecnology.enum';
import { of, throwError } from 'rxjs';
import { GET_LOGIN_ERROR_PAGE, LOGIN_ERROR_PAGE_CATALOG } from './login.constants';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy;
  // let recaptchaV3ServiceSpy;
  let modalSpy;
  let platformSpy;
  let iabSpy;
  let loggSpy;
  let toastServiceSpy;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
    selectSnapshot = jasmine.createSpy().and.returnValue({productCode: 3});
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
  }
  class SecureStorageMock {
    get = jasmine.createSpy().and.returnValue(Promise.resolve());
    set = jasmine.createSpy();
    remove = jasmine.createSpy();
  }

  beforeEach(async(() => {
    modalSpy = jasmine.createSpyObj('ModalController', ['create']);
    // recaptchaV3ServiceSpy = jasmine.createSpyObj('ReCaptchaV3Service', ['execute']);
    platformSpy = jasmine.createSpyObj('Platform', ['is']);
    iabSpy = jasmine.createSpyObj('InAppBrowserService', ['createInAppBrowser']);
    loggSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA', 'logFirebaseEvent']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['presentToast']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['checkNovaFibra']);

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [IonicModule.forRoot(), HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useClass: StoreMock},
        { provide: ModalController, useValue: modalSpy },
        // { provide: ReCaptchaV3Service, useValue: recaptchaV3ServiceSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: SecureStorageService, useClass: SecureStorageMock },
        { provide: InAppBrowserService, useValue: iabSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: AnalyticsService, useValue: loggSpy },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
  it('should capture Client if only Novo Mundo Client', () => {
    loginServiceSpy.checkNovaFibra.and.returnValue( of({ produtosLegado: 0, produtosNovaFibra: 1 }));
    component.cpfOrCnpjFormControl.setValue('98765432100');
    const params = {
      onlyNovaFibra: {
        call: 'handlerNovaFibraUser',
          params: {
          }
      },
      hasLegacy: {
        call: 'dispatchDataAndForward',
          params: {
              key: 'cpfOrCnpj'
          }
      }
    }
    spyOn(component, 'handlerNovaFibraUser');
    component.callNovaFibraChecker(params);
    expect(component.handlerNovaFibraUser).toHaveBeenCalled();
  });
  it('should NOT capture Client if not Novo Mundo Client', () => {
    loginServiceSpy.checkNovaFibra.and.returnValue( of({ produtosLegado: 1, produtosNovaFibra: 0 }));
    component.cpfOrCnpjFormControl.setValue('98765432100');
    const params = {
      onlyNovaFibra: {
        call: 'handleNovaFibraUser',
          params: {
          }
      },
      hasLegacy: {
        call: 'dispatchDataAndForward',
          params: {
              key: 'cpfOrCnpj'
          }
      }
    }
    spyOn(component, 'dispatchDataAndForward');
    component.callNovaFibraChecker(params);
    expect(component.dispatchDataAndForward).toHaveBeenCalledWith(params.hasLegacy.params);
  });
  it('should not capture Client if error calling novaFibraCheck', () => {
    loginServiceSpy.checkNovaFibra.and.returnValue(throwError('teste'))
    const params = {
      onlyNovaFibra: {
        call: 'handleNovaFibraUser',
          params: {
          }
      },
      hasLegacy: {
        call: 'dispatchDataAndForward',
          params: {
              key: 'cpfOrCnpj'
          }
      }
    }
    spyOn(component, 'dispatchDataAndForward');
    component.callNovaFibraChecker(params);
    expect(component.dispatchDataAndForward).toHaveBeenCalledWith(params.hasLegacy.params);
  });
  it('should redirect to correct page if NovaFibra Android', ()=> {
    spyOn(component, 'checkIfAndroid').and.callFake(() => true);
    component.handlerNovaFibraUser();
    expect(component.currentStep).toBe(GET_LOGIN_ERROR_PAGE(
      LOGIN_ERROR_PAGE_CATALOG.novaFibraAndroid))
  })
  it('should redirect to correct page if NovaFibra ios or PWA', ()=> {
    spyOn(component, 'checkIfAndroid').and.callFake(() => false);
    component.handlerNovaFibraUser();
    expect(component.currentStep).toBe(GET_LOGIN_ERROR_PAGE(
      LOGIN_ERROR_PAGE_CATALOG.novaFibraIos))
  })
});
