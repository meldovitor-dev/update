import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-progression-bar',
  templateUrl: './progression-bar.component.html',
  styleUrls: ['./progression-bar.component.scss'],
})
export class ProgressionBarComponent implements OnInit {

  @Input() isConclusionStep = false;
  @Input() progressionStep = 1;
  constructor() { }

  ngOnInit() {
  }

}
