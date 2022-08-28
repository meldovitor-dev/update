import { NativeSettingsService } from './../../services/native-settings.service';
import { IonSlides } from '@ionic/angular';
import { GET_HIGHEST_PRIORITY_PENDENCE } from './home-footer.constants';
import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { PendingActionsService } from 'src/app/services/pending-actions.service';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss'],
})
export class HomeFooterComponent implements OnInit, AfterContentInit {
  public pending;
  @ViewChild('slidesFooter', { static: true }) slidesFooter: IonSlides;
  constructor(
    public pas: PendingActionsService,
    public settingsService: NativeSettingsService,
    public analyticsService: AnalyticsService) {
  }
  ngOnInit() {
  }
  ngAfterContentInit(): void {
    this.listenPendencies(); // observable for pendencies
  }

  listenPendencies() {
    this.updatePendingPage(this.pas.snapshotPendencies().map(el => el.id));
    this.pas.pendenciesChanges().subscribe(res => {
      this.updatePendingPage(res.map(el => el.id));
    })
  }

  updatePendingPage(ids = []) {
    this.pending = GET_HIGHEST_PRIORITY_PENDENCE(ids);
    if (this.slidesFooter) {
      this.slidesFooter.update();
    }
  }
  resolvePendingAction(btn) {
    const { action, gaAction } = btn;
    if (gaAction) {
      this.analyticsService.logEventGA(gaAction, 'click');
    }
    this[action.call](action.params);
  }
  goOnline() {
    this.settingsService.openSetting('wifi');
  }

}
