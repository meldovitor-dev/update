import { Component, OnInit, Input, AfterContentInit, SimpleChanges, OnChanges } from '@angular/core';
import { TimerTypes } from '../../general.constants';

@Component({
    selector: 'tecvirt-ts-timer',
    template: `
      <tecvirt-progress-ring *ngIf="progressRing" [countdown]="countdown"></tecvirt-progress-ring>
      <tecvirt-stopwatch *ngIf="stopwatch" [countdown]="countdown"></tecvirt-stopwatch>
      <tecvirt-loading *ngIf="loading" [label]="loadingLabel" layout="fullscreen" color="info"></tecvirt-loading>`,
})
export class TsTimeComponent implements OnInit, AfterContentInit, OnChanges {
    @Input() type;
    @Input() countdown;
    @Input() loadingLabel;
    progressRing = false;
    stopwatch = false;
    loading = false;
    constructor() { }
    
    ngOnInit() {
    }
    ngOnChanges(sp: SimpleChanges)  {
        this.progressRing = false;
        this.stopwatch = false;
        this.loading = false;
        if (this.type === TimerTypes.RING) {
            this.progressRing = true;
            return;
        }
        if (this.type === TimerTypes.TIMER) {
            this.stopwatch = true;
            return;
        }
        this.loading = true;
    }
    ngAfterContentInit(): void {
    }
}
