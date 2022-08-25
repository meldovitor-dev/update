import { ConnectionState } from './../states/connection.state';
import { UserState } from 'src/app/states/user.state';
import { Store } from '@ngxs/store';
import { RequestProviderService } from './request-provider.service';
import { Injectable } from '@angular/core';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';
import { ProductHelper } from '../helpers/product-helper';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  protocol;
  constructor(private store: Store,
    private req: RequestProviderService) { }

  //  If we have the feature, the user id and is online, get the protocol from BE
  //  Otherwise get from ProductHelper
  async generateProtocol(feature) {
    const { problemType } = feature;
    const { id } = this.store.selectSnapshot(UserState.getUser);
    const isConnected = this.store.selectSnapshot(ConnectionState.getConnection).connected;
    if (feature && id && isConnected) {
      const url = TECNICO_VIRTUAL_API.protocolo.replace('{id}', id);
      try {
        const tr = await this.req.post(url, { problemType }, undefined).toPromise();
        const response = JSON.parse(JSON.stringify(tr));
        this.protocol = response.unipro;
        return this.protocol;
      } catch (e) {
        console.log('error protocol', e);
      }
    }
    return ProductHelper.generateUnipro();
  }
}
