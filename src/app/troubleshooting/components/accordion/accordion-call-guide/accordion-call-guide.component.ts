import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-accordion-call-guide',
  templateUrl: './accordion-call-guide.component.html',
  styleUrls: ['./accordion-call-guide.component.scss'],
})
export class AccordionCallGuideComponent {
    @Output() buttonEvent = new EventEmitter<any>();
    @Input() accordionContent: any[];
    constructor() {}

    expandAccordion(item) {
      let option;
      this.accordionContent.forEach((el) => {
        if (item === el) {
          el.open = !el.open;
          option = el.open;
        } else {
          el.open = false;
        }
        return el;
      });
      this.buttonEvent.emit({
        open: option,
      });
    }

    getAccordionIconClass(item) {
      return `accordion-icone icone-${item.image}`;
    }
}
