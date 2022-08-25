/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { NativeSettingsService } from 'src/app/services/native-settings.service';
import { SubSink } from 'subsink';
import { ConnectionState } from 'src/app/states/connection.state';
import { map } from 'rxjs/operators';
import { FeatureState } from 'src/app/states/feature.state';
import { FeatureInterface } from 'src/app/domain/feature.interface';
import { Observable } from 'rxjs';
import { FeatureUnset } from 'src/app/actions/feature.action';
import { LoginService } from 'src/app/services/login.service';
import { GET_OFFLINE_WARNING_PAGE, OfflineWarningEnum } from './offline-warning.constants';
import { ScreenSet } from 'src/app/actions/screen.actions';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-offline-warning',
  templateUrl: './offline-warning.component.html',
  styleUrls: ['./offline-warning.component.scss'],
})
export class OfflineWarningComponent implements OnInit, OnDestroy {
  @Select(FeatureState.getFeature) feature$: Observable<FeatureInterface>;
  page;
  subs = new SubSink();
  context: string;
  constructor(
    public router: Router,
    public store: Store,
    public nativeSet: NativeSettingsService,
    public route: ActivatedRoute,
    public loginService: LoginService,
  ) {}

  ngOnInit() {
    this.subs.sink = this.route.params
      .pipe(map((p) => p.context))
      .subscribe((context) => {
        this.context = context;
        if (this.isDiagnosticContext()) {
          this.store.selectSnapshot(ConnectionState.getConnection).connected ?
            this.page = GET_OFFLINE_WARNING_PAGE(OfflineWarningEnum.INDISPONIVEL_DIAGNOSTIC) :
            this.page = GET_OFFLINE_WARNING_PAGE(OfflineWarningEnum.OFFLINE_DIAGNOSTIC);
          return;
        }
        this.store.selectSnapshot(ConnectionState.getConnection).connected ?
          this.page = GET_OFFLINE_WARNING_PAGE(OfflineWarningEnum.INDISPONIVEL_FEATURE) :
          this.page = GET_OFFLINE_WARNING_PAGE(OfflineWarningEnum.OFFLINE_FEATURE);
      });
    if (this.page.offline) {
      this.subs.sink = this.store
        .select(ConnectionState.getConnection)
        .subscribe((conn) => {
          if (conn.connected) {
            this.fowardAction();
            return;
          }
        });
    }
    this.dispatchGA();
  }
  fowardAction() {
    this.goToHome();
    return;
  }
  navAction() {
    if (this.isDiagnosticContext()) {
      this.goToDiagnostic();
    }
    this.goToTroubleshooting();
  }
  goToTroubleshooting() {
    this.unsubscribeEvents();
    this.router.navigate(['solucao-de-problemas']);
  }
  goToDiagnostic() {
    this.unsubscribeEvents();
    this.router.navigate(['diagnostico']);
  }
  openWifi() {
    this.nativeSet.openSetting('wifi');
  }
  goToHome() {
    this.unsubscribeEvents();
    this.store.dispatch(new FeatureUnset());
    this.router.navigate(['home']);
  }
  onClick(btn) {
    const { action } = btn;
    this[action.call](action.params);
  }
  isDiagnosticContext() {
    return this.context === 'diagnostico';
  }
  dispatchGA() {
    if (!this.page || !this.page.gaPageName) {
      return;
    }
    this.store.dispatch(new ScreenSet({
      screenName: this.page.gaPageName,
      contextFlow: this.page.fluxo,
  }));
  }
  ngOnDestroy() {
    this.unsubscribeEvents();
  }
  unsubscribeEvents() {
    this.subs.unsubscribe();
  }
}
