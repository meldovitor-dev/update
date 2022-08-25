import { LoginComponent } from 'src/app/modals/login/login.component';
import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from '@ionic/angular';

import { FooterLoginComponent } from './footer-login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { LoginService } from 'src/app/services/login.service';
import { of, throwError } from 'rxjs';
import { LOGIN_ERROR_PAGE_CATALOG } from 'src/app/modals/login/login.constants';

describe('FooterLoginComponent', () => {
  let component: FooterLoginComponent;
  let fixture: ComponentFixture<FooterLoginComponent>;

  let storeSpy;
  let loginServiceSpy;
  let analyticsServiceSpy;
  let platformSpy;
  let generalHelperSpy;
  let validationHelperSpy;

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
    platformSpy = jasmine.createSpyObj('Platform', ['is']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['cpfOrCnpjIsValid', 'loginWithForm', 'checkNovaFibra']);
    generalHelperSpy = jasmine.createSpyObj('GeneralHelper', ['onlyNumbers']);
    validationHelperSpy = jasmine.createSpyObj('ValidationHelper', ['validateCPF', 'validateCNPJ']);

    TestBed.configureTestingModule({
      declarations: [ FooterLoginComponent ],
      imports: [IonicModule.forRoot(), HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeSpy},
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: Platform, useValue: platformSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update termsOfUse when termsUpdated function is called', () => {
    const evt = true;
    component.termsUpdated(evt);
    expect(component.termsOfUse).toBe(true);
  });

  it('should return false when pending has property shouldDisableBtn equals to false', () => {
    component.pending = {shouldDisableBtn: false };
    const disable = component.shouldDisable();
    expect(disable).toBe(false);
  });

  it('should return true when all statments are true', () => {
    component.pending = {shouldDisableBtn: true };
    generalHelperSpy.onlyNumbers.and.callFake(() => '98765432100');
    loginServiceSpy.cpfOrCnpjIsValid.and.callFake(() => true);
    component.termsOfUse = false;

    const disable = component.shouldDisable();
    expect(disable).toBe(true);
  });

  it('should  call logEventGA when goLogin was called', () => {
    component.pending = { button: { gaAction: 'teste'}};
    component.goLogin();
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalledWith('teste', 'click');
  });

  it('should not call logEventGA when goLogin was called if no gaAction', () => {
    component.pending = { button: { gaAction: ''}};
    component.goLogin();
    expect(analyticsServiceSpy.logEventGA).not.toHaveBeenCalled();
  });

  it('should call fibra login when goLogin was called if product is Fibra', () => {
    component.pending = { button: { gaAction: ''}};
    storeSpy.selectSnapshot.and.callFake(() => ProductCodeEnum.FIBRA);
    spyOn(component, 'handleFibraLogin').and.callFake(()=> {});
    component.goLogin();
    expect(component.handleFibraLogin).toHaveBeenCalled();
    expect(loginServiceSpy.loginWithForm).not.toHaveBeenCalled();
  });

  it('should call normal login when goLogin was called if product is not Fibra', () => {
    component.pending = { button: { gaAction: ''}};
    spyOn(component, 'handleFibraLogin').and.callFake(()=> {});
    storeSpy.selectSnapshot.and.callFake(() => ProductCodeEnum.BANDA_LARGA);
    component.goLogin();
    expect(component.handleFibraLogin).not.toHaveBeenCalled();
    expect(loginServiceSpy.loginWithForm).toHaveBeenCalled();
  });

  it('should  call logEventGA when publishEventGA was called', () => {
    component.pending = { button: { gaAction: 'teste'}};
    component.publishEventGA('teste');
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalledWith('teste', 'click');
  });

  it('should return true if is Android and checkIfAndroid is called', () => {
    platformSpy.is.and.callFake(()=> true);
    const isAndroid = component.checkIfAndroid();
    expect(isAndroid).toBe(true);
  });

  it('resolvePendingAction function should emit output button', () => {
    spyOn(component.resolvePendenciesEvt, 'emit');
    component.resolvePendingAction('teste');
    expect(component.resolvePendenciesEvt.emit).toHaveBeenCalledWith('teste');
  });

  it('should loginWithForm be called when handleFibraLogin has no nova fibra', () => {
    loginServiceSpy.checkNovaFibra.and.returnValue(of({}));
    component.handleFibraLogin('98765432100');
    expect(loginServiceSpy.loginWithForm).toHaveBeenCalledWith(LoginComponent, { cpfOrCnpj: '98765432100'});
  });

  it('should handlerNovaFibraUser be called when handleFibraLogin has nova fibra', () => {
    loginServiceSpy.checkNovaFibra.and.returnValue(of({ produtosNovaFibra: 1}));
    spyOn(component, 'handlerNovaFibraUser');
    component.handleFibraLogin('98765432100');
    expect(component.handlerNovaFibraUser).toHaveBeenCalled();
  });

  it('should handler error in handleFibraLogin subscriber', () => {
    loginServiceSpy.checkNovaFibra.and.returnValue(throwError({status: 404}));
    spyOn(component, 'handlerNovaFibraUser');
    component.handleFibraLogin('98765432100');
    expect(loginServiceSpy.loginWithForm).toHaveBeenCalledWith(LoginComponent, { cpfOrCnpj: '98765432100'});
  });

  it('should handler error in handleFibraLogin subscriber', () => {
    loginServiceSpy.checkNovaFibra.and.returnValue(throwError({status: 429}));
    spyOn(component, 'handlerNovaFibraUser');
    component.handleFibraLogin('98765432100');
    expect(loginServiceSpy.loginWithForm).not.toHaveBeenCalledWith(LoginComponent, { cpfOrCnpj: '98765432100'});
  });

  it('should call goLogin when validCpfOrCnpj is call with correct cpf or cnpj', () => {
    component.cpfControl.setValue('98765432100');
    spyOn(component, 'goLogin').and.callFake(() => {});
    component.validCpfOrCnpj();
    expect(component.goLogin).toHaveBeenCalled();
  });

  it('should not call goLogin when validCpfOrCnpj has cpf error and set error', () => {
    component.cpfControl.setValue('98765432101');
    spyOn(component, 'goLogin').and.callFake(() => {});
    component.validCpfOrCnpj();
    expect(component.goLogin).not.toHaveBeenCalled();
    expect(component.cpfControl.errors).toEqual({ error: 'CPF Inválido' });
  });

  it('should not call goLogin when validCpfOrCnpj has cnpf error and set error', () => {
    component.cpfControl.setValue('987654321011');
    spyOn(component, 'goLogin').and.callFake(() => {});
    component.validCpfOrCnpj();
    expect(component.goLogin).not.toHaveBeenCalled();
    expect(component.cpfControl.errors).toEqual({ error: 'CNPJ Inválido' });
  });

  it('should go to error nova fibra login when handlerNovaFibraUser is called android', () => {
    spyOn(component, 'checkIfAndroid').and.returnValue(true);
    component.handlerNovaFibraUser();
    expect(loginServiceSpy.loginWithForm).toHaveBeenCalledWith(LoginComponent, {
      errorReason: LOGIN_ERROR_PAGE_CATALOG.novaFibraAndroid
    });
  });

  it('should go to error nova fibra login when handlerNovaFibraUser is called ios', () => {
    spyOn(component, 'checkIfAndroid').and.returnValue(false);
    component.handlerNovaFibraUser();
    expect(loginServiceSpy.loginWithForm).toHaveBeenCalledWith(LoginComponent, {
      errorReason: LOGIN_ERROR_PAGE_CATALOG.novaFibraIos
    });
  });

});
