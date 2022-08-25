import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from './../../environments/environment';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaUtilityService {

  public deferredPrompt;
  public hiddenInstallBtn = true;
  constructor(
    public updates: SwUpdate,
    public alertController: AlertController,
    public platform: Platform,
    public toast: ToastController,
    public appRef: ApplicationRef
  ) {
  }
  init() {
    if (this.platform.is('hybrid') || !environment.isPWA) {
      return;
    }
    this.checkIfAlreadyInstalled(); // installed handler
    this.updatesHandler(); // update handler
  }

  updatesHandler() {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());
    this.updates.available.subscribe(event => {
      this.presentAlertConfirm();
    });
  }
  isPwa() {
    return this.platform.is('mobileweb') || this.platform.is('desktop');
  }
  checkIfAlreadyInstalled() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      // console.log('🚀 pwa is installed!!');
      return;
    }
    // console.log('😢 pwa isnt installed!!');
    this.installPrompt();
  }

  installPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // console.log('🚀 beforeinstallprompt Event fired');
      this.hiddenInstallBtn = false;
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // try install
      // this.schedulingInstallBanner();
    });
  }

  installBanner() {
    // console.log('trying install pwa');
    this.deferredPrompt.prompt();
    this.hiddenInstallBtn = true;
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        this.listenAppInstaled();
      } else {
        //   console.log('User dismissed the install prompt');
      }
    });
  }

  listenAppInstaled() {
    this.toastMessages('Adicionando App na tela de início...');
    window.addEventListener('appinstalled', (evt) => {
      const ref = setTimeout(() => {
        if (ref) {
          clearTimeout(ref);
        }
        this.toastMessages('App Adicionado!');
      }, 5000);
    });
  }

  toastMessages(message: string, duration = 2000) {
    this.toast.create({
      message,
      duration
    }).then((t) => {
      t.present();
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Atualize o Técnico Virtual pra ter um melhor atendimento de Fibra, Internet, TV e Fixo.',
      buttons: [
        {
          text: 'Depois',
          role: 'cancel',
          handler: () => {
            // console.log('cancel update');
          }
        }, {
          text: 'Atualizar',
          handler: () => {
            this.updates.activateUpdate().then(() => document.location.reload());
          }
        }
      ]
    });
    await alert.present();
  }
}
