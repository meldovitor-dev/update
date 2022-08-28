import { TERMS } from './../terms-of-use-description/terms-of-use-description.constants';
import { LocalstorageService } from './../../services/localstorage.service';
import { TermsOfUseDescriptionComponent } from './../terms-of-use-description/terms-of-use-description.component';
import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, Output, EventEmitter, AfterContentInit, Input } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent implements OnInit, AfterContentInit {

  @Output() termsUpdated = new EventEmitter<any>();
  @Input() theme;
  public userTerms: boolean;
  public version;
  public termsOfUseKey = 'accepted-terms';
  constructor(public modalCtrl: ModalController,
    public localStorage: LocalstorageService,
    public alertController: AlertController,
    public analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.version = TERMS.version;
    this.handlerStartToggle();

  }
  ngAfterContentInit(): void {
    this.termsUpdated.emit(this.userTerms);
  }
  public handlerStartToggle() {
    const acceptedTerms = this.getAcceptTermsFromStorage();
    if (acceptedTerms.find(el => el.version === this.version)) {
      this.userTerms = true;
      return;
    }
    if (acceptedTerms.length) {
      this.presentNewTermToAccept();
    }
  }
  public async presentNewTermToAccept() {
    const alert = await this.alertController.create({
      header: 'Termos de uso',
      message: 'Existe uma atualização do termo de uso. É preciso que aceite para continuar a acessar o app.',
      buttons: [
        {
          text: 'Termo de uso',
          handler: () => {
            this.openTerms();
            alert.dismiss();
          },
        },
        {
          text: 'Voltar ao login',
          handler: () => {
            alert.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }
  public async openTerms() {
    this.analyticsService.logEventGA('ler_termos_uso', 'click');
    const modal = await this.modalCtrl.create({
      component: TermsOfUseDescriptionComponent
    });
    await modal.present();
  }
  termsUpdatedEvt(evt: any) {
    this.analyticsService.logEventGA('aceitar_termos_uso', 'click');
    this.updateTermOnStorage(this.userTerms);
    this.termsUpdated.emit(this.userTerms);
  }

  updateTermOnStorage(hasAccept) {
    const acceptedTerms = this.getAcceptTermsFromStorage();
    const term = acceptedTerms.find(el => el.version === this.version);
    if (!term && hasAccept) {
      acceptedTerms.push(this.termStoreObjCreate());
      this.localStorage.setItem(this.termsOfUseKey, JSON.stringify(acceptedTerms));
      return;
    }
    if (term && !hasAccept) {
      const updated = (acceptedTerms || []).filter(el => el !== term);
      this.localStorage.setItem(this.termsOfUseKey, JSON.stringify(updated));
      return;
    }
  }
  public getAcceptTermsFromStorage() {
    let acceptedTerms;
    try {
      acceptedTerms = JSON.parse(this.localStorage.getItem(this.termsOfUseKey)) || [];
    } catch (e) {
      acceptedTerms = [];
    }
    return acceptedTerms;
  }

  termStoreObjCreate() {
    const term = {
      version: this.version,
      timestamp: new Date().getTime()
    }
    return Object.assign({}, term);
  }

}
