import { Injectable } from '@angular/core';
import { ConnectionModel } from './../models/connection.model';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }
  public async getStateConnection(): Promise<ConnectionModel>{
    const status = (await Network.getStatus() as ConnectionModel);
    return status;
  }
  public listenNetwork(cb) {
    Network.addListener('networkStatusChange', cb);
  }
}
