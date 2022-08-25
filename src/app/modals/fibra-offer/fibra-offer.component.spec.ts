/* eslint-disable @typescript-eslint/naming-convention */
import { of, throwError } from 'rxjs';
import { ProductHelper } from './../../helpers/product-helper';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FibraOfferComponent, FibraOfferEnum } from './fibra-offer.component';
import { Store } from '@ngxs/store';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { CallService } from 'src/app/services/call.service';
import { RequestProviderService } from 'src/app/services/request-provider.service';

describe('FibraOfferComponent', () => {
  let component: FibraOfferComponent;
  let fixture: ComponentFixture<FibraOfferComponent>;

  let modalControllerSpy;
  let localstorageServiceSpy;
  let storeSpy;
  let callServiceSpy;
  let httpSpy;

  const slidesMock = [
    {
      id: FibraOfferEnum.INIT,
      gaPageName: 'fixo_consulta_disponibilidade_fibra_endereco',
      src: 'tv_fibra.png',
      hasForm: true,
      title: 'Tenha Oi Fibra na sua casa',
      description: 'Digite os dados abaixo e verifique se Oi Fibra está disponível na sua região:',
      button: {
        txt: 'Verifique a disponibilidade',
        action: {
          call: 'verifyAvailability',
          params: {}
        }
      }
    },
    {
      id: FibraOfferEnum.SUCCESS_RESULT,
    },
    {
      id: FibraOfferEnum.NOT_AVAILABLE,

    },
    {
      id: FibraOfferEnum.TIMEOUT,
    },
  ];

  beforeEach(async(() => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);
    localstorageServiceSpy = jasmine.createSpyObj('LocalstorageService', ['setItem']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot', 'select']);
    callServiceSpy = jasmine.createSpyObj('CallService', ['callWithNumber']);
    httpSpy = jasmine.createSpyObj('RequestProviderService', ['get']);

    TestBed.configureTestingModule({
      declarations: [FibraOfferComponent],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: Store, useValue: storeSpy },
        { provide: LocalstorageService, useValue: localstorageServiceSpy },
        { provide: CallService, useValue: callServiceSpy },
        { provide: RequestProviderService, useValue: httpSpy },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FibraOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call subs unsub when ngOnDestroy is called', () => {
    spyOn(component.subs, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subs.unsubscribe).toHaveBeenCalled();
  });

  it('should call modal controlller and set fo at success page when closeModal is called', () => {
    spyOn(component.subs, 'unsubscribe');
    storeSpy.selectSnapshot.and.returnValue('success');
    component.closeModal();
    expect(component.subs.unsubscribe).toHaveBeenCalled();
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
    expect(localstorageServiceSpy.setItem).toHaveBeenCalledWith('fo', true);
  });

  it('should call modal controlller but not set fo at home page when closeModal is called', () => {
    spyOn(component.subs, 'unsubscribe');
    storeSpy.selectSnapshot.and.returnValue('home');
    component.closeModal();
    expect(component.subs.unsubscribe).toHaveBeenCalled();
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
    expect(localstorageServiceSpy.setItem).not.toHaveBeenCalledWith('fo', true);
  });

  it('should return fibraOffer phone when getAtendimento is called with config', () => {
    storeSpy.selectSnapshot.and.returnValue('teste');
    spyOn(ProductHelper, 'extractConfigValue').and.returnValue({ telefone: '123' });
    const phone = component.getAtendimento();
    expect(phone).toBe('123');
  });

  it('should return fibraOffer phone when getAtendimento is called with no config', () => {
    storeSpy.selectSnapshot.and.returnValue('');
    spyOn(ProductHelper, 'getPhoneConfig').and.returnValue({
      fibraOffer: '123',
      telefone_default_r1: '',
      telefone_default_r2: '',
      fibra: undefined,
      telefone_default_tv: '',
      offline: '',
      oi_solucoes: ''
    });
    const phone = component.getAtendimento();
    expect(phone).toBe('123');
  });

  it('should call callcenter service when goToCallService is called', () => {
    storeSpy.selectSnapshot.and.returnValue('');
    spyOn(component, 'getAtendimento').and.returnValue('123');
    component.goToCallService();
    expect(callServiceSpy.callWithNumber).toHaveBeenCalledWith('123');
  });

  it('should remove letters and spaces when setCEP is called', () => {
    const cep = '123 abc4';
    component.setCEP(cep);
    expect(component.cep).toBe('1234');
  });

  it('should set addressNumber when setNumero is called', () => {
    const addnumber = '123';
    component.setNumero(addnumber);
    expect(component.addressNumber).toBe('123');
  });

  it('should disable rules for addressNumber when noNumberEvt is called with no number', () => {
    spyOn(component.addressNumberFormControl, 'disable');
    spyOn(component.addressNumberFormControl, 'setValue');
    spyOn(component.addressNumberFormControl, 'setErrors');
    component.noNumber = true;
    component.noNumberEvt();
    expect(component.addressNumberFormControl.disable).toHaveBeenCalled();
    expect(component.addressNumberFormControl.setValue).toHaveBeenCalledWith('');
    expect(component.addressNumberFormControl.setErrors).toHaveBeenCalledWith(null);
  });

  it('should enable rules for addressNumber when noNumberEvt is called with number', () => {
    spyOn(component.addressNumberFormControl, 'enable');
    component.noNumber = false;
    component.noNumberEvt();
    expect(component.addressNumberFormControl.enable).toHaveBeenCalled();
  });

  it('should call correct function when actionButton is called', () => {
    spyOn(component, 'verifyAvailability');
    component.modalPage = slidesMock[0];
    component.actionButton();
    expect(component.verifyAvailability).toHaveBeenCalled();
  });

  it('should go to successPage when verifyAvailability is called and req is available', async () => {
    httpSpy.get.and.returnValue(of({ viavelFibra: true }));
    await component.verifyAvailability();
    expect(component.modalPage.id).toBe(FibraOfferEnum.SUCCESS_RESULT);
  });

  it('should go to not available when verifyAvailability is called and req is not available', async () => {
    httpSpy.get.and.returnValue(of({ viavelFibra: false }));
    component.noNumber = true;
    await component.verifyAvailability();
    expect(component.modalPage.id).toBe(FibraOfferEnum.NOT_AVAILABLE);
  });

  it('should go to error page when verifyAvailability is called and req throws an error', async () => {
    httpSpy.get.and.returnValue(throwError({ status: 404 }));
    await component.verifyAvailability();
    expect(component.modalPage.id).toBe(FibraOfferEnum.TIMEOUT);
  });

});
