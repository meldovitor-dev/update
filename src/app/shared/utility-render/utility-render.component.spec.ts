import { AnalyticsService } from 'src/app/core/analytics.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { UtilityRenderComponent } from './utility-render.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { Store } from '@ngxs/store';
import { UtilityPageModel } from 'src/app/models/utility-render-model';
import { HttpClientModule } from '@angular/common/http';

describe('UtilityRenderComponent', () => {
  let component: UtilityRenderComponent;
  let fixture: ComponentFixture<UtilityRenderComponent>;
  let catalog: UtilityPageModel[] = [{
    id: 'unit-id',
    gaPageName: 'unit-ga',
    title: 'unit-title',
    paragraph:'unit-paragraph',
  },
  {
    id: 'unit-id-2',
    gaPageName: 'unit-ga-2',
    title: 'unit-title-2',
    paragraph:'unit-paragraph-2',
  },
]
  let store = jasmine.createSpyObj('Store', ['selectSnapshot', 'dispatch']);
  let modalControllerSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);
  let analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ UtilityRenderComponent,
                      HeaderComponent,
                    ],
      providers: [
        { provide: Store, useValue: store },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ],
      imports: [IonicModule.forRoot(), HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilityRenderComponent);
    component = fixture.componentInstance;
    component.pageCatalog = catalog;
    component.currentPage = {id: 'teste', gaPageName: 'teste'};
    component.initialPage = 'unit-id';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should nav to another page', () => {
    component.currentPage = { id: 'unit-id-1'} as any;
    const params = { id: 'unit-id-2'};
    component.nav(params);
    expect(component.currentPage.id).toBe('unit-id-2');
  });
  it('should updatePage update environment', () => {
    component.currentPage = { id: 'unit-id-1'} as any;
    const id = 'unit-id-2';
    component.historyCatalog = [];
    component.updateCurrentPage(id);
    expect(component.currentPage.id).toBe('unit-id-2');
    expect(component.historyCatalog.length).toEqual(1);
  });
  it('should go previous page', () => {
    const page = [{ id: 'unit-id-2'}];
    component.historyCatalog = page as any;
    component.goToPreviousPage()
    expect(component.historyCatalog.length).toEqual(0);
    expect(component.currentPage.id).toBe('unit-id-2');
  });
  it('should close modal if no historyCatalog page', () => {
    modalControllerSpy.dismiss.and.callThrough();
    component.historyCatalog = [];
    component.goToPreviousPage()
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
  });
  it('should present go back button', () => {
    const page = [];
    component.historyCatalog = page as any;
    const res = component.hiddenBackButton();
    expect(res).toEqual(true);
  });
  it('should not present go back button', () => {
    const page = [{ id: 'unit-id-2'}];
    component.historyCatalog = page as any;
    const res = component.hiddenBackButton();
    expect(res).toEqual(false);
  });
  it('should call correct function buttonClick', () => {
    const btn = { action: { call: 'nav', params: 'teste'}};
    spyOn(component, 'nav').and.callFake(() => {});
    component.buttonClick(btn);
    expect(component.nav).toHaveBeenCalledWith('teste');
  });
  it('should close modal if no closeRender called', () => {
    modalControllerSpy.dismiss.and.callThrough();
    component.closeRender()
    expect(modalControllerSpy.dismiss).toHaveBeenCalled();
  });

  it('should not call analitics if no gaPageName', () => {
    component.currentPage = {id: 'teste', gaPageName: undefined};
    component.publicAnalytics()
    expect(store.dispatch).not.toHaveBeenCalledWith({
      screenName: undefined
    });
  });

});
