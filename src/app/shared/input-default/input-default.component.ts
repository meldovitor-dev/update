import { GeneralHelper } from './../../helpers/general.helper';
import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'tecvirt-input-default',
    templateUrl: './input-default.component.html',
    styleUrls: ['./input-default.component.scss'],
})
export class InputDefaultComponent implements OnInit, AfterContentInit, OnChanges {
    @Input() label = '';
    @Input() parentFormControl: FormControl;
    @Output() inputChanged = new EventEmitter<string>();
    @Input() mask;
    @Input() color = 'light';
    @Input() type = 'tel';
    @Input() maxLength;
    @Input() minLength;
    @Input() cypress = '';
    cbMask;
    textColor;
    constructor() { }

    ngOnInit() {
        (this.color === 'light') ? this.textColor = 'dark' :  this.textColor = 'light';
    }
    ngOnChanges(changes: SimpleChanges) {
        //
    }

    inputChangedCb(evt) {
        const { value } = evt.detail;
        this.addMask(value);
        if (value) {
            this.inputChanged.emit(value);
        }
    }
    addMask(value) {
        if (this.mask) {
            const input = value.match(/[0-9]/g);
            const maskedValue = GeneralHelper.mask(this.mask, input ? input.join('') : '');
            this.parentFormControl.setValue(maskedValue);
            this.maxLength = GeneralHelper.maskMaxLength[this.mask];
            this.minLength = GeneralHelper.maskMinLength[this.mask];
        }
    }

    ngAfterContentInit(): void {
        if (this.mask) {
            this.addMask(this.parentFormControl.value);
        }
    }
}
