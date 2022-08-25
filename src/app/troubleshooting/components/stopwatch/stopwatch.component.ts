import { TimeoutControlService } from './../../../services/timeout-control.service';
import { Component, OnInit, Input, SimpleChanges, OnChanges, AfterContentInit } from '@angular/core';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tecvirt-stopwatch',
    template: `
    <div stopwatch>
      <p>{{time}}</p>
    </div>`,
    styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements AfterContentInit {
    @Input() interaction: string;
    @Input() countdown;
    public time;
    constructor() { }

    ngAfterContentInit(): void {
        this.countdown.on('tick', (r) => {
            this.time = r.formatedDown;
        });
    }
}
