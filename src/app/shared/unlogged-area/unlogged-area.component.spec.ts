import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, Platform, ModalController } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UnloggedAreaComponent } from './unlogged-area.component';
import { Store } from '@ngxs/store';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { of } from 'rxjs';
import { TecnologyEnum } from 'src/app/enums/tecnology.enum';
import { ProductIdentifierEnum } from 'src/app/enums/product.enum';
import { FibraControleRemotoHome, OiProducts, FibraConfiguracaoAntenaModem } from 'src/app/domain/feature';
import { ProductBandaLarga, ProductFibraTv } from 'src/app/domain/product';
import { FeatureSet } from 'src/app/actions/feature.action';


describe('UnloggedAreaComponent', () => {
  let component: UnloggedAreaComponent;
  let fixture: ComponentFixture<UnloggedAreaComponent>;

  let platformSpy;
  let modalControllerSpy;
  let storeSpy;
  let loginServiceSpy;
  let routerSpy;
  let modalSpy;
  let analyticsServiceSpy;

  const productMock = {
    displayName: '',
    productCode: 1,
    features: [],
    tecnology: TecnologyEnum.FIBRA,
    identifier: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
    ga: ''
  };

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['loginWithForm', 'logoutAndReturn', 'retrieveUserFromSecureStorage',
      'handleMoreThanOneContract', 'changeContractLogin', 'isLoggedIn']);
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);
    modalSpy = jasmine.createSpyObj('Modal', ['present', 'onWillDismiss']);
    platformSpy = jasmine.createSpyObj('Platform', ['is']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ UnloggedAreaComponent ],
      providers: [  // Necessário importar todas os serviços chamados no construtor
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnloggedAreaComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'product$', { writable: true });
    component.product$ = of(productMock);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the correct icon when getIcon is called', () => {
    const feature = new FibraControleRemotoHome();
    const icon = component.getIcon(feature);
    expect(icon).toBe('controle-remoto');
  });

  it('should get features when getFeatureThatIsAnIcon is called', () => {
    const product = new ProductBandaLarga()
    const features = product.features;
    const unloggedFeature = component.getFeatureThatIsAnIcon(features);
    expect(unloggedFeature.length).toBe(2);
  });

  it('should set feature when onSelectFeature is called', () => {
    storeSpy.selectSnapshot.and.returnValue(new ProductFibraTv());
    storeSpy.dispatch.and.returnValue(of({}));
    const feature = new FibraControleRemotoHome();
    component.onSelectFeature(feature);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(new FeatureSet(feature));
  });

  it('should set modal feature when onSelectFeature is called', () => {
    storeSpy.selectSnapshot.and.returnValue(new ProductFibraTv());
    storeSpy.dispatch.and.returnValue(of({}));
    spyOn(component, 'openFeatureModal')
    const feature = new OiProducts();
    component.onSelectFeature(feature);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(new FeatureSet(feature));
  });

  it('should return true when feature has no platform property', () => {
    const feature = new FibraControleRemotoHome();
    const teste = component.isAcceptedPlatform(feature);
    expect(teste).toBe(true);
  });

  it('should return true when feature has the platform', () => {
    const feature = new FibraConfiguracaoAntenaModem();
    platformSpy.is.and.returnValue(true);
    const teste = component.isAcceptedPlatform(feature);
    expect(teste).toBe(true);
  });

  it('should return false when feature doesnt have the platform', () => {
    const feature = new FibraConfiguracaoAntenaModem();
    platformSpy.is.and.returnValue(false);
    const teste = component.isAcceptedPlatform(feature);
    expect(teste).toBe(false);
  });

  it('should return true when feature doesnt have the platform for shouldBeHidden', () => {
    const feature = new FibraConfiguracaoAntenaModem();
    platformSpy.is.and.returnValue(false);
    const teste = component.shouldBeHidden(feature);
    expect(teste).toBe(true);
  });
});
