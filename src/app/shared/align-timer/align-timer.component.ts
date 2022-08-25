import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { InteractionModel } from 'src/app/domain/interactions';
import { of, Subscription } from 'rxjs';
import { take, delay } from 'rxjs/operators';

@Component({
    selector: 'tecvirt-align-timer',
    templateUrl: './align-timer.component.html',
    styleUrls: ['./align-timer.component.scss']
})
export class AlignTimerComponent implements OnInit, OnChanges {
    @Input() page: {interaction: string, title: string, paragraph: string, delay: number};
    @Output() alignmentDone = new EventEmitter<string>();
    timeout$: Subscription;
    constructor() { }

    ngOnInit() {
    }
    ngOnChanges(sc: SimpleChanges) {
        const { page } = sc;
        if (!!page.currentValue) {
            if (this.timeout$) {
                this.timeout$.unsubscribe();
            }
            this.timeout$ = of(this.page.interaction || 'generic').pipe(
                delay(this.page.delay || 3000),
                take(1)
            ).subscribe(res => {
                this.alignmentDone.emit(res);
            });
        }
    }
}
