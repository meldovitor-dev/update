import { ConnectionState } from './../states/connection.state';
import { LoginService } from 'src/app/services/login.service';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngxs/store';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ProductState } from '../states/product.state';
import { filter, timeout, take } from 'rxjs/operators';
import { DiagnosticService } from './diagnostic.service';
import { LocationAction } from '../actions/location.actions';
import { ScreenSet } from '../actions/screen.actions';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tecvirt-diagnostic',
    templateUrl: './diagnostic.page.html',
    styleUrls: ['./diagnostic.page.scss']
})
export class DiagnosticPage implements OnInit, AfterContentInit {
    loading = true;
    constructor(public store: Store,
                public router: Router,
                public loginService: LoginService,
                public diagnosticService: DiagnosticService) { }

    ngOnInit() {
        this.store.dispatch(new LocationAction('diagnostic'));
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart && !event.url.match(/diagnostico|solucao-de-problemas/g))
        ).subscribe(res => {
            this.diagnosticService.execDistroyers();
            this.diagnosticService.resetTickets();
        });
        this.publishGA();
        if (!this.loginService.isLoggedIn()) {
            this.router.navigate(['solucao-de-problemas']);
        }

        this.loading = true;
        const sub = this.store.select(ProductState.getConfig).pipe(
            filter(res => !!res),
            take(1),
            timeout(10000)
        ).subscribe(_ => {
            this.diagnosticService.init();
            this.diagnosticService.resetTickets();
            this.router.navigate(['diagnostico/consultas']).finally(() => {
                sub.unsubscribe();
                this.loading = false;
            });
        }, (error) => {
            this.router.navigate(['home']).finally(() => {
                sub.unsubscribe();
                this.loading = false;
            });
        });
        // diagnostic refuse redirect to ts

    }
    publishGA() {
        this.store.dispatch(new ScreenSet({
            screenName: 'diagnostico_inicio',
            contextFlow: 'diagnostico'
        }));
    }
    ngAfterContentInit(): void {
        // this.diagnosticProvider.init();
    }
    routerActived(evt) {
        // router actived on evt
    }
}
