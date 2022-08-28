import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-viewmore-button',
  template: `
  `,
  styleUrls: ['./viewmore-button.component.scss'],
})
export class ViewmoreButtonComponent implements OnInit {

  @Input() noLabel;
  constructor() { }

  ngOnInit() {}
}
