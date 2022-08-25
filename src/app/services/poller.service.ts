/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from './../../environments/environment.prod';
import { SubSink } from 'subsink';
import { RequestProviderService } from './request-provider.service';
import { Injectable, OnDestroy } from '@angular/core';
import { timer, of, Subject } from 'rxjs';
import { filter, take, mergeMap, delay, repeat, catchError, takeUntil, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollerService implements OnDestroy {

  subs = new SubSink();
  constructor(public requestProvider: RequestProviderService) { }

  public pollerRequest(ticketRequest$, config: { interval_ms?: number, aggregator?: boolean } = {}, destroy$: Subject<boolean>) {
    const $destroy$ = destroy$ || new Subject<boolean>();
    // stop criteria
    const check = (r) => ((r.isEmExecucao === false || (!!r.status && !config.aggregator)));
    return timer(0, config.interval_ms || environment.CONFIG_CONSTANTS.DEFAULT_POLLER_INTERVAL).pipe(
      finalize(() => $destroy$.unsubscribe()),
      mergeMap(_ => this.requestProvider.get(ticketRequest$, undefined).pipe(catchError(err => of({})))),
      filter(check),
      takeUntil($destroy$),
      take(1)
    );
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }
}
