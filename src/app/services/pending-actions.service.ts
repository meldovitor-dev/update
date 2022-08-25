import { PENDING_PAGES_CATALOG } from '../home/home-footer/home-footer.constants';
import { UserState } from './../states/user.state';
import { ConnectionState } from './../states/connection.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';
import { ServerMaintenanceService } from './server-maintenance.service';

@Injectable({
  providedIn: 'root'
})
export class PendingActionsService {

  private pendencies = [];
  private pendencies$: Subject<any>;
  constructor(public store: Store,
    public loggingService: LoginService,
    public serverMaintenanceService: ServerMaintenanceService) {
    this.pendencies$ = new Subject<any>();
  }

  insertPendencies(p: any) {
    if (this.pendencies.find(el => el.id === p.id)) {
      return;
    }
    this.pendencies.push(p);
    this.pendencies$.next(this.pendencies);
  }
  snapshotPendencies() {
    return this.pendencies;
  }

  removePendencies(p: any) {
    const pFound = this.pendencies.find(el => el.id === p);
    if (!pFound) {
      return;
    }
    this.pendencies = this.pendencies.filter(el => el !== pFound);
    this.pendencies$.next(this.pendencies);
  }
  pendenciesChanges() {
    return this.pendencies$;
  }

  init() {
    this.store.select(ConnectionState).subscribe(res => {
      const { connection } = res;
      if (connection.connected) {
        this.removePendencies(PENDING_PAGES_CATALOG.goOnline);
        return;
      }
      this.insertPendencies({
        id: PENDING_PAGES_CATALOG.goOnline
      });
    });
    this.store.select(UserState).subscribe(res => {
      if (this.loggingService.isLoggedIn()) {
        this.removePendencies(PENDING_PAGES_CATALOG.doLogin);
        return;
      }
      this.insertPendencies({
        id: PENDING_PAGES_CATALOG.doLogin
      });
    });
    this.serverMaintenanceService.isMaintenance$.subscribe(res => {
      console.log('Manutenção Subscribe ===>', res);
      // if (res) {
      //   this.insertPendencies({
      //     id: PENDING_PAGES_CATALOG.maintenance
      //   });
      //   return;
      // }
      // this.removePendencies(PENDING_PAGES_CATALOG.maintenance);
    });
    return this;
  }
}
