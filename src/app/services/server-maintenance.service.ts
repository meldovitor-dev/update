import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerMaintenanceService {

  isMaintenance$;
  constructor() { }
  init() {
    this.isMaintenance$ = new BehaviorSubject(false);
  }
  setMaintenance(maintenance: boolean) {
    this.isMaintenance$.next(maintenance);
  }
  getMaintenance() {
    return this.isMaintenance$.value;
  }
}
