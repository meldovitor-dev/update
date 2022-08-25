import { AntirobotService } from './../services/antirobot.service';
import { tap } from 'rxjs/operators';
import { UserState } from '../states/user.state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AppState } from '../states/app.state';
import { LoginService } from '../services/login.service';
import { LocationState } from '../states/location.state';
import { AnalyticsService } from './analytics.service';
import { ServerMaintenanceService } from '../services/server-maintenance.service';

@Injectable({
    providedIn: 'root'
})
export class DefaultHttpInterceptor {
    constructor(public store: Store,
        public router: Router,
        public activatedRouter: ActivatedRoute,
        private platform: Platform,
        private loginService: LoginService,
        private antirobot: AntirobotService,
        private analyticsService: AnalyticsService,
        private serverMaintenanceService: ServerMaintenanceService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { authorization } = this.store.selectSnapshot(UserState.getUser);
        const headers: any = { canal: this.store.selectSnapshot(AppState.getApp).channel };
        if (authorization && !this.noAppendTokenRoutes(request)) {
            headers.authorization = authorization;
        }
        if (!request.headers.get('authorization')) {
            request = request.clone({
                setHeaders: headers
            });
        }
        return next.handle(request).pipe(
            tap(res => {
                // ok response
                this.handleMaintenance(res);
            }, err => {
                if (this.skipErrorInterceptor(request.url)) {
                    return;
                }
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.logEventExpiredSession();
                        console.log('Sua seção expirou 😕');
                        this.loginService.retakeLogin();
                    }
                    if (err.status === 423) {
                        console.log('Anti robot action 🤖');
                        this.antirobot.presentModal();
                    }
                    if (err.status === 503 || err.status === 502 || err.status === 520) {
                        this.serverMaintenanceService.setMaintenance(true);
                    }
                }
            })
        );
    }
    public noAppendTokenRoutes(request) {
        const { url } = request;
        return (url && url.includes('login'));
    }
    public skipErrorInterceptor(url = '') {
        return url.includes('logging/log');
    }

    logEventExpiredSession() {
        const location = this.store.selectSnapshot(LocationState);
        if (location === 'troubleshooting' || location === 'diagnostic') {
            this.analyticsService.logEventGA('controle_sessao', 'expirada');
        }
    }
    handleMaintenance(res) {
        if (res instanceof HttpResponse) {
            const { url } = res;
            if (url && url.includes('status')) {
                return;
            }
            const maintenanceStatus = this.serverMaintenanceService.getMaintenance();
            if (maintenanceStatus) {
                this.serverMaintenanceService.setMaintenance(false);
            }
        }
    }
}
