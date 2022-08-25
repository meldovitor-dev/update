import { Component, OnInit, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-status-check',
  templateUrl: './status-check.component.html',
  styleUrls: ['./status-check.component.scss']
})
export class StatusCheckComponent implements OnInit {
    @Input() layoutSteps = [];
  constructor() { }

  ngOnInit() {
  }

}
