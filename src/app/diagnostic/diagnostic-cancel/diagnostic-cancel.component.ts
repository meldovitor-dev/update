import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-diagnostic-cancel',
  templateUrl: './diagnostic-cancel.component.html',
  styleUrls: ['./diagnostic-cancel.component.scss'],
})
export class DiagnosticCancelComponent implements OnInit {

  gaPageName = 'cancelar_diagnostico';
  cancelButton = 'voltar_inicio';
  keepButton = 'continuar';
  constructor(
    public modalController: ModalController,
    public logg: AnalyticsService) { }

  ngOnInit() {
    this.logg.logScreenViewGa('cancelar_diagnostico');
  }

  backToHome() {
    const action = {
      call: 'goToHome'
    };
    this.dismiss({ action });
  }
  dismiss(data?) {
    this.modalController.dismiss(data);
  }

  getBtnGa(key: string) {
    if (key === 'cancel') {
      return {
        gaAction: this.cancelButton
      };
    }
    return {
      gaAction: this.keepButton
    };
  }

}
