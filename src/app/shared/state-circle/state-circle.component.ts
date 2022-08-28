import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-state-circle',
  templateUrl: './state-circle.component.html',
  styleUrls: ['./state-circle.component.scss'],
})
export class StateCircleComponent implements OnInit {

  @Input() state = 'doing';
  @Input() icon = 'build';
  @Input() index = 0;
  constructor() { }

  ngOnInit() {
  }
}
