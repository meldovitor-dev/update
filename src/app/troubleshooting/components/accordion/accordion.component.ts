/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Output, EventEmitter, Input, AfterContentInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-accordion',
  template: `
  <tecvirt-accordion-call-guide
        *ngIf="type === CALL_GUIDE"
        [accordionContent]='accordionContent'
        (buttonEvent)='clickEvent($event)'>
    </tecvirt-accordion-call-guide>
    <tecvirt-accordion-dispositivos
        *ngIf="type === CONNECTED_DEVICES"
        [accordionContent]='accordionContent'
        (buttonEvent)='clickEvent($event)'>
    </tecvirt-accordion-dispositivos>
  `,
})
export class AccordionComponent implements OnInit{
  @Output() buttonClickedEvt = new EventEmitter<any>();
  @Input() accordionContent: any[];
  @Input() type: string;

  CALL_GUIDE = 'call-guide';
  CONNECTED_DEVICES = 'connected-devices';
  constructor() { }

  ngOnInit() {
  }
  accordionChanges($event) {
    this.buttonClickedEvt.emit($event);
  }
  clickEvent(event) {
    this.buttonClickedEvt.emit(event);
  }
}
