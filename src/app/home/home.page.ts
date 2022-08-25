/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { TokenMinhaOiService } from './../services/token-minha-oi.service';
import { ProductIdentifierEnum } from 'src/app/enums/product.enum';
import { ScreenState } from './../states/screen.state';
import { ToastService } from './../services/toast.service';
import { LocationAction } from './../actions/location.actions';
import { ProductState } from './../states/product.state';
import { UserState } from './../states/user.state';
import { LoginComponent } from './../modals/login/login.component';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { LoginService } from './../services/login.service';
import { FormControl } from '@angular/forms';
import { ConnectionState } from './../states/connection.state';
import { Component, OnInit, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductInterface } from '../domain/product.interface';
import { ScreenSet } from '../actions/screen.actions';
import { HomeTicketService } from '../services/home-ticket.service';
import { LOGIN_ERROR_PAGE_CATALOG, TOAST_LOGIN_SUCCESS_MINHA_OI, } from '../modals/login/login.constants';
import { gethowToSlides } from '../shared/image-carousel/how-to.contants';
import { filter } from 'rxjs/operators';
import { MoiTokenComponent } from '../modals/moi-token/moi-token.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterContentInit, OnDestroy {
  @Select(ConnectionState.getConnection) connection$;
  @Select(UserState.getUser) user$;
  @Select(ProductState.getCurrentProduct) product$: Observable<ProductInterface>;
  operation$ = {};
  public gaPageName = 'home';
  public buttonTxt = 'Login';
  public cpfOrCnpjFormControl = new FormControl('');
  public fromDeeplink = false;
  public footerLabel = 'This site is protected by reCAPTCHA and the Google ' +
    '<a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and ' +
    '<a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.';
  @ViewChild('cardDeck', { static: false }) cardDeck;
  tokenLogin = false;
  constructor(
    public store: Store,
    public loginService: LoginService,
    public router: Router,
    public route: ActivatedRoute,
    public modalController: ModalController,
    public homeTicketService: HomeTicketService,
    public toastService: ToastService,
    public tokenService: TokenMinhaOiService
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(async (res) => {
      const params: {
        isPositivado?: boolean,
        portfolioPresent?: boolean,
        fromDeeplink?: boolean,
        invalidProduct?: boolean,
        needsActionContract?: boolean,
        users?: any
      } = {};
      for (let [key, value] of Object.entries(res)) {
        params[key] = value;
        if (value === 'false') {
          params[key] = false;
        }
      }
      if (!params.fromDeeplink) {
        this.fromDeeplink = false;
        return;
      }
      this.fromDeeplink = true;
      // not ok case
      if (!params.portfolioPresent) {
        this.loginService.loginWithForm(LoginComponent, {
          errorReason: LOGIN_ERROR_PAGE_CATALOG.noPortfolio, // no portfolio  error case
          actionButton: {
            txt: 'Fechar',
            action:  'goToHome'
          }
        });
        return;
      }
      if (!params.isPositivado) {
        this.loginService.loginWithForm(LoginComponent, {
            errorReason: LOGIN_ERROR_PAGE_CATALOG.notOk
        });
        return;
      }
      if (params.invalidProduct) {
        this.loginService.loginWithForm(LoginComponent, {
          errorReason: LOGIN_ERROR_PAGE_CATALOG.invalidProductMinhaOi
        });
        return;
      }
      if (params.needsActionContract) {
        const noMask = true;
        const minhaOi = true;
        const contract = await this.loginService.handleMoreThanOneContract(noMask, minhaOi);
        console.log(contract);
        if (!contract) {
          this.logout();
          return {data: undefined, role: undefined};
        }
        this.loginService.changeContractLogin(contract, LoginComponent);
        return;
      }
      this.toastService.presentToast(TOAST_LOGIN_SUCCESS_MINHA_OI);
      if(this.tokenLogin) {
        return;
      }
      this.dispatchHomeLocationAndEvent();
    });
  }
  async ngAfterContentInit() {
    if (!this.store.selectSnapshot(ProductState.getCurrentProduct)) {
      this.router.navigateByUrl('/');
      return;
    }
    if (!this.loginService.isLoggedIn()) {
        this.loginService.retrieveUserFromSecureStorage();
    }
    this.route.params.subscribe(p => {
        this.dispatchHomeLocationAndEvent();
    });
    if (!this.loginService.isLoggedIn() && this.tokenService.checkTokenLogin()) {
      await this.handleTokenLogin();
    }
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: NavigationStart) => {
      const { url } = event;
      if ( url !== '/home') {
        this.homeTicketService.execDistroyers();
        this.homeTicketService.deleteTickets();
      }
    });
  }
  dispatchHomeLocationAndEvent() {
    this.homeTicketService.init(); // dispatch tickets to be used on home
    if (this.store.selectSnapshot(ScreenState.getScreen).screenName === 'home') {
      return;
    }
    this.store.dispatch(new LocationAction('home'));
    this.store.dispatch(new ScreenSet({
        screenName: this.gaPageName,
        contextFlow: 'home'
    }));
  }
  async handleTokenLogin() {
    const modal = await this.modalController.create({
      component: MoiTokenComponent,
      cssClass: 'tec-virt-reduced-modal',
      backdropDismiss: false,
    });
    await modal.present();
    const result = await modal.onWillDismiss();
    if(result && result.data && result.data.cancel) {
      this.router.navigateByUrl('/');
      return;
    }
    this.tokenLogin = true;
  }
  getHowToSlides(productIdentifier: ProductIdentifierEnum) {
    const slides = gethowToSlides(productIdentifier);
    return slides;
  }
  login() {
    this.loginService.loginWithForm(LoginComponent);
  }
  logout() {
    this.loginService.logoutAndReturn();
  }
  troubleshooting() {
    this.router.navigateByUrl('/troubleshooting');
  }

  diagnostic() {
    this.router.navigate(['/diagnostic']);
  }
  cardDeckView() {
    this.cardDeck.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  ngOnDestroy(): void {
    this.destroyTickets();
  }
  destroyTickets() {
    this.homeTicketService.execDistroyers();
    this.homeTicketService.destroy();
  }
}
