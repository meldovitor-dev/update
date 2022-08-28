import { NativeSettingsService } from 'src/app/services/native-settings.service';
import { ModalController } from '@ionic/angular';
import { SubSink } from 'subsink';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'tecvirt-offline-handler',
  templateUrl: './offline-handler.component.html',
  styleUrls: ['./offline-handler.component.scss'],
})
export class OfflineHandlerComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  constructor(private modalController: ModalController,
    private settingsService: NativeSettingsService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  offlineContinue() {
    const offline = true;
    this.dismiss({ offline });
  }
  dismiss(data?) {
    this.modalController.dismiss(data);
  }
  openWifi() {
    this.settingsService.openSetting('wifi');
  }
}
