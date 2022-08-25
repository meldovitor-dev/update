import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-core-troubleshooting',
  templateUrl: './core-troubleshooting.component.html',
  styleUrls: ['./core-troubleshooting.component.scss'],
})
export class CoreTroubleshootingComponent implements OnInit {
  @Input() layout: any;
  constructor() { }
  ngOnInit() {}
}
