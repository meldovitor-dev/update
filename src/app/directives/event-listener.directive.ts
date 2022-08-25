import { Directive, HostListener, Input } from '@angular/core';
import { AnalyticsService } from '../core/analytics.service';

@Directive({
    selector: '[appEventListener]'
})
export class EventListenerDirective {
    @Input() appEventListenerProperty;
    constructor(public analyticsService: AnalyticsService) { }

    @HostListener('click', ['$event']) onClick($event) {
        if (!this.appEventListenerProperty) {
            return;
        }
        const { gaAction } = this.appEventListenerProperty;
        if (!!gaAction && gaAction !== 'logar') {
            this.analyticsService.logEventGA(gaAction, 'click');
        }
    }
}
