import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-buttons-list-troubleshooting',
  templateUrl: './buttons-list-troubleshooting.component.html',
  styleUrls: ['./buttons-list-troubleshooting.component.scss'],
})
export class ButtonsListTroubleshootingComponent implements OnInit {
  @Input() buttons = [];
  @Input() alphabetical = false;
  @Output() clickEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }
  onClick_(data) {
    this.clickEvent.emit(data);
  }
  hasAlphabeticButton(idx){
    if (this.alphabetical) {
      return String.fromCharCode(idx + 97);
    }
  }
}
