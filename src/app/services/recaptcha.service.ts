import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

declare let grecaptcha: any;

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  constructor() { }

  execute(action: string): Observable<string> {
    const subject = new Subject<string>();
    if (this.checkIfBypassable()) {
      setTimeout(() => {
        subject.next(undefined);
        subject.complete();
      }, 500);
      return subject.asObservable();
    }
    try {
      grecaptcha.enterprise.ready(() => {
        grecaptcha.enterprise.execute(environment.CREDENTIALS.recaptcha, { action }).then((token: string) => {
          subject.next(token);
          subject.complete();
        });
      });
      return subject.asObservable();
    } catch (error) {
      subject.error(error);
    }
  }

  checkIfBypassable(): boolean {
    const bypassableEnvs = ['DEV', 'QA'];
    if (bypassableEnvs.includes(environment.ENVIRONMENT)) {
      console.log('Recapthca Bypass 🤖');
      return true;
    }
  }
}
