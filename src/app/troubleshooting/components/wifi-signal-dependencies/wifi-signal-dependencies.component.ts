import { AnalyticsService } from 'src/app/core/analytics.service';
import { FeatureState } from 'src/app/states/feature.state';
import { Component, OnInit, Output, EventEmitter, NgZone, AfterContentInit, Input } from '@angular/core';
import { SubSink } from 'subsink';
import { NativeSettingsService } from 'src/app/services/native-settings.service';
import { WifiManagerService } from 'src/app/services/wifi-manager.service';
import { BackgroundService } from 'src/app/services/background.service';
import { Store } from '@ngxs/store';
import { ConnectionState } from 'src/app/states/connection.state';
import { timer, of, Subject, ReplaySubject } from 'rxjs';
import { delay, map, filter, take } from 'rxjs/operators';
import { FeatureEnum } from 'src/app/enums/feature.enum';

const DEPENDENCIES_LIST = [
  {
    id: 'wifiConnected',
    // icon: 'wifi',
    label: 'Rede Wi-Fi da Oi',
    error: 'Conectar no Wi-Fi da Oi',
    action: 'wifiSettinfgs',
    testFunction: 'isConnectionWifi',
    state: 'todo',
    result: false
  },
  {
    id: 'gpsActive',
    // icon: 'pin',
    label: 'GPS',
    error: 'Clique aqui para habilitar o GPS',
    action: 'gpsSettings',
    testFunction: 'gpsTest',
    state: 'todo',
    result: false
  },
  {
    id: 'permissionGranted',
    // icon: 'locate',
    label: 'Permissão de Localização',
    error: 'Clique aqui para permitir a localização',
    action: 'permissionSettings',
    testFunction: 'permissionGranted',
    state: 'todo',
    result: false
  },
  {
    id: 'strongRSSI',
    // icon: 'speedometer',
    label: 'Próximo ao modem',
    error: 'Fique a 1 metro e meio do modem e clique aqui novamente',
    action: 'rssiRetry',
    testFunction: 'rssiTest',
    state: 'todo',
    result: false
  },
];

@Component({
  selector: 'tecvirt-wifi-signal-dependencies',
  templateUrl: './wifi-signal-dependencies.component.html',
  styleUrls: ['./wifi-signal-dependencies.component.scss'],
})
export class WifiSignalDependenciesComponent implements OnInit, AfterContentInit {
  subs = new SubSink();
  dependencies = DEPENDENCIES_LIST;
  dependencies$ = new ReplaySubject(1);
  stateTypes = ['todo', 'doing'];
  @Input() wifiList = [];
  @Output() wifiDependeciesEvt = new EventEmitter<any>();
  semaphorLock = false;
  retakeRssi = false;
  retakeWifi = false;
  normalFlow = false;
  constructor(
    public settingsService: NativeSettingsService,
    public wifiService: WifiManagerService,
    public backgroundSercice: BackgroundService,
    public store: Store,
    public zone: NgZone,
    public logger: AnalyticsService
  ) {
  }

  ngOnInit() {
    const {featureCode } = this.store.selectSnapshot(FeatureState.getFeature);
    const strongRssiFeatures = [FeatureEnum.FIBRA_COMPATIBILIDADE_VELOCIDADES, FeatureEnum.FIBRA_LENTA];
    if (!strongRssiFeatures.includes(featureCode)) {
      this.normalFlow = true;
      this.dependencies = DEPENDENCIES_LIST.filter(el => el.id !== 'strongRSSI');
    }
    this.dependencies.forEach(el => el.state = 'todo');
    this.dependencies$.next(this.dependencies);
    this.callDependencies();
    this.backgroundSercice.onPause.subscribe(() => {
        console.log('device pause on compoennt');
    });
    this.backgroundSercice.onResume.subscribe(() => {
        this.callDependencies();
    });
  }
  ngAfterContentInit() {
      this.publishAsyncResolveDependencies(this.dependencies);
  }
  callDependencies() {
      if (this.semaphorLock) {
          return;
      }
      this.semaphorLock = true;
      this.resolveDependencies();
  }

  resolveDependencies(idx = 0) {
    if (idx < this.dependencies.length ) {
        this.dependencies[idx].state = 'doing';
        this.dependencies$.next(this.dependencies);
    }
    of ({}).pipe(
        delay(1000),
        take(1)
    ).subscribe(() => {
        this.updateState(idx);
    });
  }
  updateState(idx) {
    if ( idx >= this.dependencies.length) {
        if (this.didAllStepsAreSucceed()) {
          this.wifiDependeciesEvt.emit(true);
        }
        this.semaphorLock = false;
        if (this.retakeRssi) {
          this.wifiDependeciesEvt.emit(false);
        }
        if (this.retakeWifi) {
          this.wifiDependeciesEvt.emit('notWifiOi');
        }
        return;
    }
    const cb = this.dependencies[idx].testFunction;
    this[cb]().then(res => {
        this.dependencies[idx].result = !!res;
        this.dependencies[idx].result ? this.dependencies[idx].state = 'done' : this.dependencies[idx].state = 'error';
        this.publishAsyncResolveDependencies(this.dependencies);
        this.resolveDependencies(++idx);
    }).catch(e => {
        this.dependencies[idx].result = false;
        this.dependencies[idx].result ? this.dependencies[idx].state = 'done' : this.dependencies[idx].state = 'error';
        this.publishAsyncResolveDependencies(this.dependencies);
        this.resolveDependencies(++idx);
    });

  }
  didAllStepsAreSucceed() {
    return !this.dependencies.find(el => el.state !== 'done');
  }
  publishAsyncResolveDependencies(dependencies) {
    this.zone.run(() => {
       this.dependencies$.next(dependencies);
    });
  }
  public isConnectionWifi() {
    if (this.normalFlow) {
      return this.store.selectOnce(ConnectionState.getConnection).pipe(
        map(el => el.connectionType === 'wifi')
      ).toPromise();
    }
    return this.wifiService.isConnectedToOiWifi(this.wifiList);
  }
  public gpsTest() {
    return this.wifiService.isGpsEnable();
  }
  public permissionGranted() {
    return this.wifiService.isGpsPermissionAccepted();
  }
  public rssiTest() {
    return this.wifiService.isRSSIStrong();
  }
  depClick(dep) {
    this[dep.action]();
  }
  depResult(dep) {
    return this[dep.id];
  }
  gpsSettings() {
    this.logger.logEventGA('habilitar_gps', 'click');
    this.settingsService.openSetting('location');
  }
  permissionSettings() {
    this.logger.logEventGA('permitir_localizacao', 'click');
    this.settingsService.openSetting('application_details');
  }
  wifiSettinfgs() {
    this.logger.logEventGA('conectar_wifi', 'click');
    this.settingsService.openSetting('wifi');
    this.retakeWifi = true;
  }
  rssiRetry() {
    this.logger.logEventGA('verificar_instrucoes', 'click');
    this.retakeRssi = true;
    this.ngOnInit();
  }
}
