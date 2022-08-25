/* eslint-disable max-len */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { HomeTicketService } from '../services/home-ticket.service';
import { ToastService } from '../services/toast.service';
import { TokenMinhaOiService } from '../services/token-minha-oi.service';
import { of, Observable } from 'rxjs';
import { TecnologyEnum } from '../enums/tecnology.enum';
import { ProductIdentifierEnum } from '../enums/product.enum';
import { LocationAction } from '../actions/location.actions';
import { ScreenSet } from '../actions/screen.actions';
import { MoiTokenComponent } from '../modals/moi-token/moi-token.component';
import { LoginComponent } from '../modals/login/login.component';

describe('HomePage', () => {     //  TODO descobrir uma maniera de manipular o resultado dos observables dos routers
  let storeSpy;
  let modalControllerSpy;
  let loginServiceSpy;
  let routerSpy;
  let homeTicketServiceSpy;
  let toastServiceSpy;
  let tokenServiceSpy;
  let modalSpy;

  const productMock = {
    displayName: '',
    productCode: 1,
    features: [],
    tecnology: TecnologyEnum.FIBRA,
    identifier: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
    ga: ''
  };
  class ActivatedRouteMock {    // Uma maneira de conseguir mockar observables de serviços chamados no construtor
    queryParams = new Observable(observer => {
      const urlParams = {fromDeeplink: 'true', portfolioPresent: 'true', isPositivado: 'true', needsActionContract: 'true'};
      observer.next(urlParams);
      observer.complete();
    });
    params = new Observable(observer => {
      const urlParams = {
        param1: 'some',
        param2: 'params'
      };
      observer.next(urlParams);
      observer.complete();
    });
  }


  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);   // Adicionar como segundo parametro todas as funçoes usadas no componente
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['loginWithForm', 'logoutAndReturn', 'retrieveUserFromSecureStorage',
                                           'handleMoreThanOneContract', 'changeContractLogin', 'isLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    homeTicketServiceSpy = jasmine.createSpyObj('HomeTicketService', ['execDistroyers', 'deleteTickets', 'init', 'destroy']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['presentToast']);
    tokenServiceSpy = jasmine.createSpyObj('TokenMinhaOiService', ['checkTokenLogin']);
    modalSpy = jasmine.createSpyObj('Modal', ['present', 'onWillDismiss']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ HomePage ],
      schemas: [NO_ERRORS_SCHEMA], // Com esse parametro, nao precisamos declarar todos os componentes usados por esse componente
      providers: [  // Necessário importar todas os serviços chamados no construtor
        { provide: Store, useValue: storeSpy },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: HomeTicketService, useValue: homeTicketServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: TokenMinhaOiService, useValue: tokenServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'connection$', { writable: true });  // uma maneira de conseguir mockar o @Select no componente
    component.connection$ = of('value');
    Object.defineProperty(component, 'user$', { writable: true });
    component.user$ = of('value');
    Object.defineProperty(component, 'product$', { writable: true });
    component.product$ = of(productMock);
    Object.defineProperty(routerSpy, 'events', { writable: true });
    routerSpy.events = of({url: '/'});
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Simply entering home should not dispatch home location and events', () => {
    spyOn(component, 'dispatchHomeLocationAndEvent');   // Cria um spy para uma funçao do componente
    component.ngOnInit(); // Chama a função que vai ser testada
    expect(component.dispatchHomeLocationAndEvent).not.toHaveBeenCalled(); // verifica se foi chamada ou não a funçao com spy
  });

  it('Minha Oi Login Deeplink home should login client', () => {
    spyOn(component, 'dispatchHomeLocationAndEvent');
    loginServiceSpy.handleMoreThanOneContract.and.callFake(() => ({})); // Em caso de funçoes de serviços, não precisa criar spy
    loginServiceSpy.changeContractLogin.and.callThrough();
    component.ngOnInit();
    expect(loginServiceSpy.handleMoreThanOneContract).toHaveBeenCalledWith(true, true);
    expect(component.dispatchHomeLocationAndEvent).not.toHaveBeenCalledWith({}, LoginComponent);
  });

  it('dispatchHomeLocationAndEvent should call home ticket service and store dispatches', () => {
    homeTicketServiceSpy.init.and.callFake(() => {});
    storeSpy.dispatch.and.callFake(() => {});
    storeSpy.selectSnapshot.and.callFake(() => ({screenName: 'teste'}));
    component.dispatchHomeLocationAndEvent();
    expect(homeTicketServiceSpy.init).toHaveBeenCalled();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(new LocationAction('home'));
    expect(storeSpy.dispatch).toHaveBeenCalledWith(new ScreenSet({
      screenName: 'home',
      contextFlow: 'home'
    }));
  });

  it('dispatchHomeLocationAndEvent should not dispatch if screenName is home', () => {
    homeTicketServiceSpy.init.and.callFake(() => {});
    storeSpy.selectSnapshot.and.callFake(() => ({screenName: 'home'}));
    component.dispatchHomeLocationAndEvent();
    expect(homeTicketServiceSpy.init).toHaveBeenCalled();
    expect(storeSpy.dispatch).not.toHaveBeenCalledWith(new LocationAction('home'));
    expect(storeSpy.dispatch).not.toHaveBeenCalledWith(new ScreenSet({
      screenName: 'home',
      contextFlow: 'home'
    }));
  });

  it('ngAfterContentInit should redirect to / if no product selected', () => {
    storeSpy.selectSnapshot.and.callFake(() => undefined);
    component.ngAfterContentInit();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(('/'));
  });

  it('ngAfterContentInit should correctly be initiated', () => {
    spyOn(component, 'handleTokenLogin');
    spyOn(component, 'dispatchHomeLocationAndEvent');
    storeSpy.selectSnapshot.and.callFake(() => 'teste');
    loginServiceSpy.isLoggedIn.and.callFake(() => false);
    tokenServiceSpy.checkTokenLogin.and.callFake(() => true);
    loginServiceSpy.retrieveUserFromSecureStorage.and.callFake(() => {});

    component.ngAfterContentInit();

    expect(loginServiceSpy.retrieveUserFromSecureStorage).toHaveBeenCalled();
    expect(component.handleTokenLogin).toHaveBeenCalled();
    expect(component.dispatchHomeLocationAndEvent).toHaveBeenCalled();
  });

  it('handleTokenLogin should have modal working properly', () => {
    modalControllerSpy.create.and.callFake(() => modalSpy);
    modalSpy.present.and.callFake(() => ({}));
    modalSpy.onWillDismiss.and.callFake(() => ({}));
    component.handleTokenLogin();
    expect(modalControllerSpy.create).toHaveBeenCalledWith(({
      component: MoiTokenComponent,
      cssClass: 'tec-virt-reduced-modal',
      backdropDismiss: false,
    }));
  });

  it('login should call login service method loginWithForm', () => {
    loginServiceSpy.loginWithForm.and.callThrough();
    component.login();
    expect(loginServiceSpy.loginWithForm).toHaveBeenCalledWith(LoginComponent);
  });

  it('logout should call login service method logoutAndReturn', () => {
    loginServiceSpy.logoutAndReturn.and.callThrough();
    component.logout();
    expect(loginServiceSpy.logoutAndReturn).toHaveBeenCalled();
  });

  it('troubleshooting should redirct to /troubleshooting', () => {
    routerSpy.navigateByUrl.and.callThrough();
    component.troubleshooting();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/troubleshooting');
  });

  it('diagnostic should redirct to /diagnostic', () => {
    routerSpy.navigate.and.callThrough();
    component.diagnostic();
    expect(routerSpy.navigate).toHaveBeenCalledWith([ '/diagnostic' ]);
  });

  it('cardDeckView should scroll into view', () => {
    spyOn(component.cardDeck.nativeElement, 'scrollIntoView').and.callThrough();
    component.cardDeckView();
    expect(component.cardDeck.nativeElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

});

