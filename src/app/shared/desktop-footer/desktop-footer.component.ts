import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-desktop-footer',
  templateUrl: './desktop-footer.component.html',
  styleUrls: ['./desktop-footer.component.scss']
})
export class DesktopFooterComponent implements OnInit {
  @Input() footerLabel = '';
  constructor() { }

  ngOnInit() {
  }

}
