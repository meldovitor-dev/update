import { map } from 'rxjs/operators';
import { takeWhile } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';

export interface ITimer {
  start(): void;
  stop(): void;
  reset(): void;
  pause(): void;
  resume(): void;
  emit(event): void;
  on(event: string, callback: Function): void;
  getCurrentTime(): string;
  getState(): TimerState;
}

export enum TimerState {
  STOPPED,
  RUNNING
}

export class CountdownTimer implements ITimer {
  public id: string;
  private readonly INTERVAL = 1000;
  private time: number;
  private callbacks: any[] = [];
  private intervalID: Subscription;
  private state: TimerState;

  constructor(id: string, private startTime: number) {
    this.init(id, startTime)
  }
  init(id, startTime){
    this.id = id;
    if (this.startTime < 0) {
      throw new Error('Start time must be equal to or greater than zero.');
    }
    this.time = startTime;
    this.state = TimerState.STOPPED;
  }

  public getCurrentTime(): string {
    return this.formatTime(this.toMMss(this.time));
  }
  public getTime() {
    return this.time * 1000;
  }
  public getTimeout() {
    return this.startTime * 1000;
  }

  public getState(): TimerState {
    return this.state;
  }

  public start(): void {
    this.state = TimerState.RUNNING;
    this.intervalID = timer(0, this.INTERVAL)
      .pipe(
        take(this.startTime),
        takeWhile(value => {
          return this.state !== TimerState.STOPPED;
        }),
        map(value => {
          this.time = this.startTime - (value + 1);
          return this.time;
        })
      )
      .subscribe(value => {
        const notify = this.prepareNotify(value);
        this.notify('tick', notify);
        if (value === 0) {
          this.notify('finish', notify);
        }
      });
  }
  prepareNotify(value) {
    return {
      formated: this.formatTime(this.toMMss(value)),
      tick: value,
      totalTime: this.startTime,
      percent: 1 - value / this.startTime
    };
  }

  public stop(): void {
    if (this.state === TimerState.RUNNING) {
      this.state = TimerState.STOPPED;
      this.intervalID.unsubscribe();
    }
  }

  public reset(): void {
    this.stop();
    this.time = this.startTime;
    this.start();
  }

  public pause(): void {
    this.state = TimerState.STOPPED;
  }

  public resume(): void {
    this.state = TimerState.RUNNING;
    this.start();
  }

  public emit(event: string) {
    this.notify(event, 0);
  }
  public on(event: string, callback: (param) => void) {
    if (!event) {
      return;
    }

    if (!callback) {
      return;
    }

    const arr = new Array<any>(event, callback);
    this.callbacks.push(arr);

  }

  //  TODO NEEDS REFACTORE
  public unsub(fun) {
    this.callbacks = this.callbacks.filter(el => el[1] !== fun);
  }

  private notify(event, context) {
    for (const callback of this.callbacks) {
      if (callback[0] === event) {
        callback[1](context);
      }
    }
  }

  private formatTime(time: DateObject) {
    const fmtMinutes = ('00' + time.minutes).slice(-2);
    const fmtSeconds = ('00' + time.seconds).slice(-2);
    return fmtMinutes + ':' + fmtSeconds;
  }
  private toMMss(timeInSeconds: number) {
    timeInSeconds = timeInSeconds ? timeInSeconds : 0;
    const seconds = Math.max(timeInSeconds % 60, 0);
    const minutes = Math.max(Math.floor(timeInSeconds / 60), 0);
    return new DateObject(minutes, seconds);
  }
}
class DateObject {
  constructor(public minutes: number, public seconds: number) {}
}
