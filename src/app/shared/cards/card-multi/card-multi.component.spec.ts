import { FibraTrocaNome } from './../../../domain/feature';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';
import { CardMultiComponent } from './card-multi.component';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ProtocolService } from 'src/app/services/protocol.service';
import { ServerMaintenanceService } from 'src/app/services/server-maintenance.service';
import { InteractionEnum } from 'src/app/domain/interactions';
import { TecnologyEnum } from 'src/app/enums/tecnology.enum';
import { of } from 'rxjs';

describe('CardMultiComponent', () => {
  let component: CardMultiComponent;
  let fixture: ComponentFixture<CardMultiComponent>;

  let storeSpy;
  let modalControllerSpy;
  let routerSpy;
  let loginServiceSpy;
  let analyticsServiceSpy;
  let protocolServiceSpy;
  let serverMaintenanceServiceSpy;

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['loginWithForm', 'logoutAndReturn', 'retrieveUserFromSecureStorage',
                                           'handleMoreThanOneContract', 'changeContractLogin', 'isLoggedIn']);
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
    protocolServiceSpy = jasmine.createSpyObj('ProtocolService', ['generateProtocol']);
    serverMaintenanceServiceSpy = jasmine.createSpyObj('ServerMaintenanceService', ['getMaintenance']);


    TestBed.configureTestingModule({
      declarations: [ CardMultiComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: ProtocolService, useValue: protocolServiceSpy },
        { provide: ServerMaintenanceService, useValue: serverMaintenanceServiceSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handlerTickets when ngOnChanges is called', () => {
    spyOn(component, 'handlerTickets');
    const changes: SimpleChanges = {
      tickets: {currentValue: 'teste', previousValue: 'teste2', firstChange: true, isFirstChange: () => true }};
    component.ngOnChanges(changes);
    expect(component.handlerTickets).toHaveBeenCalledWith('teste');
  });

  it('should enable card when handlerTickets is called with no problem', () => {
    const tickets = {
      [InteractionEnum.bandaLargaConsultaRegistro]: {
        isEmExecucao: false,
        payload: {
          fluxoSemConexaoComHDM: true,
        }
      }
    }
    component.handlerTickets(tickets);
    expect(component.labelText).toBe('Funcionalidade disponível somente para alguns modelos de modem.');
    expect(component.loading).toBe(false);
  });

  it('should disable card when handlerTickets is called with problems', () => {
    const tickets = {
      [InteractionEnum.bandaLargaConsultaRegistro]: {
        isEmExecucao: true,
        payload: {
          fluxoSemConexaoComHDM: false,
        }
      }
    }
    component.handlerTickets(tickets);
    expect(component.labelText).toBe('O seu modem não é compatível para esta funcionalidade no momento.<br><a>Clique para saber mais<a>');
    expect(component.loading).toBe(true);
  });

  it('should do nothing if no ticket when handlerTickets is called with problems', () => {
    const tickets = {}
    component.handlerTickets(tickets);
    expect(component.labelText).toBe('Funcionalidade disponível somente para alguns modelos de modem.');
    expect(component.loading).toBe(false);
  });

  it('should get the correct icon when getIcon is called', () => {
    storeSpy.selectSnapshot.and.returnValue({tecnology: TecnologyEnum.COBRE});
    const feature = new FibraTrocaNome();
    const icon = component.getIcon(feature);
    expect(icon).toBe('./assets/icon/cards-home/nome.svg');
  });

  it('should get the disableButton icon when getIcon is called', () => {
    spyOn(component, 'disableButton').and.returnValue(true);
    const feature = new FibraTrocaNome();
    const icon = component.getIcon(feature);
    expect(icon).toBe('./assets/icon/cards-home/nome_cinza.svg');
  });

  it('should return true when is cobre and not loggedin for the showOfflineLabel test', () => {
    spyOn(component, 'isCobre').and.returnValue(true);
    spyOn(component, 'isLoggedIn').and.returnValue(false);
    const offline = component.showOfflineLabel();
    expect(offline).toBe(true);
  });

  it('should return true when is cobre and showOfflineLabel for the showLabel test', () => {
    spyOn(component, 'isCobre').and.returnValue(true);
    spyOn(component, 'showOfflineLabel').and.returnValue(false);
    component.conexaoHDM = false;
    const showLabel = component.showLabel();
    expect(showLabel).toBe(true);
  });

  it('should not present modal when conexaoHDM is true', () => {
    component.conexaoHDM = true;
    component.presentModal();
    expect(modalControllerSpy.create).not.toHaveBeenCalled();
  });

  it('should present modal when conexaoHDM is false', () => {
    component.conexaoHDM = false;
    component.presentModal();
    expect(modalControllerSpy.create).toHaveBeenCalled();
  });

  it('should call corect functions when onClick is called', async () => {
    storeSpy.selectSnapshot.and.returnValue({connected: true})
    spyOn(component, 'publishGaEvent');
    spyOn(component, 'isLoggedIn').and.returnValue(true);
    spyOn(component, 'dispatchAndNav');
    const feature = new FibraTrocaNome();
    await component.onClick(feature);
    expect(component.publishGaEvent).toHaveBeenCalled();
    expect(component.dispatchAndNav).toHaveBeenCalled();
  });

  it('should ask for login if not loggedincall when onClick is called', async () => {
    storeSpy.selectSnapshot.and.returnValue({connected: true})
    spyOn(component, 'publishGaEvent');
    spyOn(component, 'isLoggedIn').and.returnValue(false);
    spyOn(component, 'dispatchAndNav');
    spyOn(component, 'askLogin');
    const feature = new FibraTrocaNome();
    await component.onClick(feature);
    expect(component.publishGaEvent).toHaveBeenCalled();
    expect(component.dispatchAndNav).not.toHaveBeenCalled();
    expect(component.askLogin).toHaveBeenCalled();
  });

  it('should go to tapume page when onClick is called', async () => {
    storeSpy.selectSnapshot.and.returnValue({connected: false})
    storeSpy.dispatch.and.returnValue(of({}));
    spyOn(component, 'publishGaEvent');
    spyOn(component, 'isLoggedIn').and.returnValue(true);
    spyOn(component, 'dispatchAndNav');
    spyOn(component, 'askLogin');
    serverMaintenanceServiceSpy.getMaintenance.and.returnValue(true);
    const feature = new FibraTrocaNome();
    await component.onClick(feature);
    expect(component.publishGaEvent).toHaveBeenCalled();
    expect(protocolServiceSpy.generateProtocol).toHaveBeenCalled();
    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalled();
    expect(component.dispatchAndNav).not.toHaveBeenCalled();
    expect(component.askLogin).not.toHaveBeenCalled();
  });

  it('should call loginService if not loggedincall when askLogin is called', async () => {
    loginServiceSpy.loginWithForm.and.returnValue(Promise.resolve({data:{loginSuccess: true }}));
    const feature = new FibraTrocaNome();
    await component.askLogin(feature);
    expect(loginServiceSpy.loginWithForm).toHaveBeenCalled();
  });

  it('should not call dispatchAndNav if no login success when askLogin is called', async () => {
    loginServiceSpy.loginWithForm.and.returnValue(Promise.resolve({data:{loginSuccess: false }}));
    spyOn(component, 'dispatchAndNav');
    const feature = new FibraTrocaNome();
    await component.askLogin(feature);
    expect(loginServiceSpy.loginWithForm).toHaveBeenCalled();
    expect(component.dispatchAndNav).not.toHaveBeenCalled();
  });

  it('should logEventGA when publishGaEvent is called', () => {
    const feature = new FibraTrocaNome();
    component.publishGaEvent(feature);
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalled();
  });

  it('should logEventGA when publishGaEvent is called', async () => {
    storeSpy.dispatch.and.returnValue(of({}));
    const feature = new FibraTrocaNome();
    await component.dispatchAndNav(feature);
    expect(routerSpy.navigate).toHaveBeenCalled();
  });
});
