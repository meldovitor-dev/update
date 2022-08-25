import { environment } from 'src/environments/environment';
import { UserState } from 'src/app/states/user.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RequestProviderService } from './request-provider.service';
import { TECNICO_VIRTUAL_API } from 'src/environments/server-urls';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FalhaMassivaInfoService {

  falhaMassivaById = TECNICO_VIRTUAL_API.falhaMassivaInfo;
  falhaMassivaId: string;
  constructor(private requestProviderService: RequestProviderService,
    private store: Store) { }

  async getFalhaMassivaById(idFalhaMassiva) {
    this.falhaMassivaId = idFalhaMassiva;
    const id = this.store.selectSnapshot(UserState.getUser).id;
    const url = this.falhaMassivaById
      .replace('{idModel}', id)
      .replace('{idFalhaMassiva}', idFalhaMassiva);
    const tr = await this.requestProviderService.get(url, {})
      .pipe(timeout(environment.CONFIG_CONSTANTS.DEFAULT_HTTP_TIMEOUT))
      .toPromise().catch(() => {
        console.log('Nova Falha Massiva');
        return undefined;
      });
    const result = tr;
    return result;
  }
  async postFalhaMassiva(falhaMassiva) {
    const id = this.store.selectSnapshot(UserState.getUser).id;
    const url = this.falhaMassivaById
      .replace('{idModel}', id)
      .replace('/{idFalhaMassiva}', '');
    delete falhaMassiva.originalResponse;
    delete falhaMassiva.ticket;
    const tr = await this.requestProviderService.post(url, falhaMassiva, {})
      .pipe(timeout(environment.CONFIG_CONSTANTS.DEFAULT_HTTP_TIMEOUT))
      .toPromise();
    const result = tr;
    return result;
  }
  async patchFalhaMassiva(falhaMassiva) {
    const id = this.store.selectSnapshot(UserState.getUser).id;
    const url = this.falhaMassivaById
      .replace('{idModel}', id)
      .replace('{idFalhaMassiva}', falhaMassiva.idFalhaMassiva);
    const tr = await this.requestProviderService.patch(url, falhaMassiva, {})
      .pipe(timeout(environment.CONFIG_CONSTANTS.DEFAULT_HTTP_TIMEOUT))
      .toPromise();
    const result = tr;
    return result;
  }

  async getFalhaMassivaFinished() {
    if (!this.falhaMassivaById) {
      return {};
    }
    const id = this.store.selectSnapshot(UserState.getUser).id;
    const url = this.falhaMassivaById
      .replace('{idModel}', id)
      .replace('{idFalhaMassiva}', 'finished');
    const tr = await this.requestProviderService.get(url, {})
      .pipe(timeout(environment.CONFIG_CONSTANTS.DEFAULT_HTTP_TIMEOUT))
      .toPromise().catch(() => undefined);
    const result = tr;
    return result;
  }
}
