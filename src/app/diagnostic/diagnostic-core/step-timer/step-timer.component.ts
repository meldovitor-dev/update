import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-step-timer',
  templateUrl: './step-timer.component.html',
  styleUrls: ['./step-timer.component.scss'],
})
export class StepTimerComponent implements OnInit {

  @Input() timer;

  constructor() { }

  ngOnInit() {}

}
