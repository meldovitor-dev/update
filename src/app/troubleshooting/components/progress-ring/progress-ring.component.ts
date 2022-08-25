/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { timer } from 'rxjs';
import { Component, ViewChild, AfterContentInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { CountdownTimer } from 'src/app/shared/countdown-timer';
import { SubSink } from 'subsink';
import { takeWhile } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-progress-ring',
  templateUrl: './progress-ring.component.html',
  styleUrls: ['./progress-ring.component.scss'],
})
export class ProgressRingComponent implements AfterContentInit, OnDestroy {
  subs = new SubSink();
  @Input() interaction: string;
  @Input() countdown: CountdownTimer;
  public circle;
  public percentage = 0;
  public timeout = 0;
  @ViewChild('myCircle', { static: true }) circle_;
  public radius;
  public circumference;
  constructor() { }

  ngAfterContentInit(): void {
    this.initVariables();
    this.checkCountdownInit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkCountdownInit();
  }

  initVariables() {
    this.circle = this.circle_.nativeElement;
    this.radius = this.circle.r.baseVal.value;
    this.circumference = this.radius * 2 * Math.PI;
    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = `${this.circumference}`;
    this.percentage = 0;
  }
  checkCountdownInit(){
    if(this.countdown && this.countdown.getTimeout()) {
      this.timeout = this.countdown.getTimeout();
      this.start();
    }
  }
  start() {
    let time = 0;
    this.updateRing(time);
    const takeUntil = () => time < this.timeout;
    this.subs.add(
      timer(0, 100).pipe(
        takeWhile(takeUntil)
      ).subscribe(() => {
        time += 100;
        this.updateRing(time);
      }));
    if (this.timeout) {
        this.countdown.on('finish', () => {
          this.timeout = 0;
          this.percentage = 100;
          this.circle.style.strokeDashoffset = 0;
        });
      }
  }
  updateRing(time) {
    this.percentage = Math.round((time / this.timeout) * 100);
    if (this.circle && this.circle.style) {
        this.circle.style.strokeDashoffset = this.circumference - time / this.timeout * this.circumference;
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
