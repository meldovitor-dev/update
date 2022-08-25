import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MenuSlidesComponent } from './menu-slides.component';
import { AnalyticsService } from 'src/app/core/analytics.service';

describe('MenuSlidesComponent', () => {
  let component: MenuSlidesComponent;
  let fixture: ComponentFixture<MenuSlidesComponent>;

  let modalControllerSpy;
  let paramsSpy;
  let analyticsServiceSpy;

  const slidesMock = [
    {
      gaLabel: 'controle_b_power_tv',
      section: 'FUNÇÕES BÁSICAS',
      description: 'POWER TV - Liga e desliga a TV',
      id: 0
    },
    {
      gaLabel: 'controle_b_voltar',
      section: 'NAVEGAÇÃO',
      description: 'VOLTAR - retorna para o último canal',
      id: 1
    }
  ];

  const itemMock = {
    open: true,
    title: 'FUNÇÕES BÁSICAS',
    items: [
      {
        gaLabel: 'controle_b_power_tv',
        section: 'FUNÇÕES BÁSICAS',
        description: 'POWER TV - Liga e desliga a TV',
        id: 0
      }
    ]
  };

  beforeEach(async(() => {
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);
    paramsSpy = jasmine.createSpyObj('NavParams', ['get']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);

    TestBed.configureTestingModule({
      declarations: [ MenuSlidesComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: NavParams, useValue: paramsSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ]
    }).compileComponents();
    paramsSpy.get.and.returnValue(slidesMock);
    fixture = TestBed.createComponent(MenuSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call modalCtrl dismiss when dismissModal is called', () => {
    component.dismissModal();
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
  });

  it('should call dismiss and tagueamento when closeButtonAction is called', () => {
    spyOn(component, 'dismissModal');
    component.closeButtonAction();
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalledWith('fechar', 'click');
    expect(component.dismissModal).toHaveBeenCalled();
  });

  it('should open accordion and close others when expandAccordion is called', () => {
    const buttonsAccordion = [];
    const categories = slidesMock
            .map(its => its.section)
            .filter((elem, index, self) => index === self.indexOf(elem));
    categories.forEach(element => {
      buttonsAccordion.push({
          open: false,
          title: element,
          items: component.getItemsBySections(element)
      });
    });
    component.buttonsAccordion = buttonsAccordion;
    spyOn(component, 'dismissModal');
    component.expandAccordion(buttonsAccordion[0]);
    expect(component.buttonsAccordion[0].open).toBe(true);
    expect(component.buttonsAccordion[1].open).toBe(false);
  });
});
