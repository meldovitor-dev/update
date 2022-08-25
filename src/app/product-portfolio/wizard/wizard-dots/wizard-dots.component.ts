import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tecvirt-wizard-dots',
    templateUrl: './wizard-dots.component.html',
    styleUrls: ['./wizard-dots.component.scss']
})
export class WizardDotsComponent implements OnInit {
    @Input() page;
    @Input() pages = [];
    @Output() bulletEvt = new EventEmitter<number>();
    constructor() { }

    ngOnInit() {
    }
    getIndex() {
        return this.pages.indexOf(this.page);
    }
    getTotalPages() {
        return this.pages.length + 1;
    }
    isActive(idx = 0) {
        return (this.pages[idx] === this.page);
    }
    onClick(idx) {
        this.bulletEvt.emit(idx);
    }
}
