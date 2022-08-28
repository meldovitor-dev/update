import { HomeTicketService } from 'src/app/services/home-ticket.service';
import { AnalyticsService } from './../../core/analytics.service';
import { OtherAppsComponent } from './../../modals/other-apps/other-apps.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TermsOfUseDescriptionComponent } from 'src/app/shared/terms-of-use-description/terms-of-use-description.component';
import { Store } from '@ngxs/store';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'tecvirt-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  public appPages = [
    {
      ga: 'termos_uso',
      title: 'Termos de Uso e Privacidade',
      action: 'openTerms',
      icon: 'icone_termo_aceite.svg',
      unlogged: true
    },
    {
      ga: 'outros_apps',
      title: 'Outros Apps da Oi',
      action: 'openOtherApps',
      icon: 'icone_outros_apps.svg',
      unlogged: true
    },
    {
      ga: 'sair',
      title: 'Sair da sua conta',
      action: 'goLogout',
      icon: 'icone_logout.svg',
      unlogged: false
    }
  ];
  @Input() user: User;
  iconPath = './assets/icon/menu';
  constructor(public router: Router,
    public modalCtrl: ModalController,
    public store: Store,
    public loginService: LoginService,
    public analyticsService: AnalyticsService,
    public ht: HomeTicketService) { }

  ngOnInit() { }

  callAction(p) {
    const { action } = p;
    this.publishGa(p);
    this[action]();
  }
  async goLogout() {
    this.ht.execDistroyers();
    this.loginService.logoutAndReturn();
  }
  public async openTerms() {
    const modal = await this.modalCtrl.create({
      component: TermsOfUseDescriptionComponent,
      componentProps: {
        showPrivacyTerms: true,
      }
    });
    await modal.present();
  }
  public async openOtherApps() {
    const modal = await this.modalCtrl.create({
      component: OtherAppsComponent
    });
    await modal.present();
  }
  publishGa(p) {
    const gaName = p.ga;
    this.analyticsService.logEventGA(gaName, 'click');
  }

}
