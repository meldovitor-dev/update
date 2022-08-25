import { Component, OnInit, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-intermediate-chrono',
  templateUrl: './intermediate-chrono.component.html',
  styleUrls: ['./intermediate-chrono.component.scss']
})
export class IntermediateChronoComponent implements OnInit {
    @Input() page?;
  constructor() { }

  ngOnInit() {
  }

}
