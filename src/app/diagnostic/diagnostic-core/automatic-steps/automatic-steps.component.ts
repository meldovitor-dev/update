import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { CountdownTimer } from 'src/app/shared/countdown-timer';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store } from '@ngxs/store';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';

@Component({
  selector: 'tecvirt-automatic-steps',
  templateUrl: './automatic-steps.component.html',
  styleUrls: ['./automatic-steps.component.scss'],
  animations: [
    trigger(
        'inOutAnimation',
        [
            transition('* => *', [
                style({ transform: 'translateX(70px)', opacity: 0 }),
                animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
        ]
    )
]
})
export class AutomaticStepsComponent implements OnInit {
  @Input() countdown: CountdownTimer;
  @Input() page: any;
  @Output() automaticActionEvt = new EventEmitter();
  animation = 'open';
  timer;
  reloadPage = false;
  constructor(public store: Store) { }

  ngOnInit() {
  }

  ngOnChanges(sp: SimpleChanges) {
    if (sp.page) {
      this.animation = this.animation === 'open' ? 'close' : 'open';
      this.publishGA();
    }
    if (sp.countdown) {
      this.countdown.on('tick', (r) => {
        this.timer = r.formated;
      });
    }

  }
  automaticAction(btn) {
    this.automaticActionEvt.emit(btn);
  }

  publishGA() {
    const analytics: ScreenStateModel = {
      screenName: this.page.gaPageName,
    };
    if (this.page.fluxo) {
      analytics.contextFlow = this.page.fluxo;
    }
    this.store.dispatch(new ScreenSet(analytics));
  }

}
