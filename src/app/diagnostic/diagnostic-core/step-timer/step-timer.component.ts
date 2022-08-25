import { Component, Input } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tecvirt-step-timer',
    templateUrl: './step-timer.component.html',
    styleUrls: ['./step-timer.component.scss']
})
export class StepTimerComponent {
    @Input() timer;
}
