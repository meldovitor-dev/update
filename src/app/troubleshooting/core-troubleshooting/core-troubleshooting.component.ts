import { Component, OnInit, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-core-troubleshooting',
  templateUrl: './core-troubleshooting.component.html',
  styleUrls: ['./core-troubleshooting.component.scss'],
})
export class CoreTroubleshootingComponent implements OnInit {
  @Input() layout: any;
  constructor() { }
  ngOnInit() {}
}
