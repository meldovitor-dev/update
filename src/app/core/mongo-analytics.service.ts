import { Injectable, OnDestroy } from '@angular/core';
import { RequestProviderService } from '../services/request-provider.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngxs/store';
import { ConnectionState } from '../states/connection.state';
import { UserState } from '../states/user.state';
import { SubSink } from 'subsink';
import { ProductState } from '../states/product.state';

@Injectable({
  providedIn: 'root'
})
export class MongoAnalyticsService implements OnDestroy {

  failedLogQueue = [];
  subs = new SubSink();
  queueOnExecution = false;
  url = `${environment.TECNICO_VIRTUAL_API}/logging/log`;

  constructor(
    public store: Store,
    public requestProvider: RequestProviderService) { }

  init() {
    this.subs.add(
      this.store.select(UserState.getUser).subscribe(res => {
        if (this.store.selectSnapshot(ConnectionState.getConnection).connected && this.isLoggedIn()) {
          this.releaseQueue();
        }
      })
    );
    this.subs.add(
      this.store.select(ConnectionState.getConnection).subscribe(res => {
        if (res.connected && this.isLoggedIn()) {
          this.releaseQueue();
        }
      })
    );
  }
  public isLoggedIn() {
    const { productCode } = this.store.selectSnapshot(ProductState.getCurrentProduct) || { productCode: undefined };
    const user = this.store.selectSnapshot(UserState.getUser);
    return (user && user.productCode === productCode && !!user.authorization);
  }
  public releaseQueue() {
    if (!this.failedLogQueue.length) {
      return;
    }
    if (!this.queueOnExecution) {
      this.queueOnExecution = true;
      this.failedLogQueue.forEach(event => {
        const evts = this.requestProvider.post(this.url, event, {});
        this.subs.add(
          evts
            .pipe(
              catchError(e => of({}))
            ).subscribe(res => {
              this.failedLogQueue = [];
              this.queueOnExecution = false;
            }, err => {
              // TODO need improvement
            })
        );
      });
    }
  }

  public logEvent(event) {
    const request = this.requestProvider.post(this.url, event, {});
    this.subs.add(
      this.requestProvider.post(this.url, event, {}).pipe(
        catchError(e => {
          this.stackOnQueue(event);
          return of({});
        })
      ).subscribe(res => {
        // event sent
      })
    );
  }
  public stackOnQueue(event) {
    this.addFailedFlag(event);
    this.failedLogQueue.push(event);
  }
  addFailedFlag(evt) {
    if (evt && evt.failedDispatch) {
      return;
    }
    evt.failedDispatch = true;
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
