import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeneralHelper } from 'src/app/helpers/general.helper';

@Component({
  selector: 'tecvirt-ssid-input',
  templateUrl: './ssid-input.component.html',
  styleUrls: ['./ssid-input.component.scss']
})
export class SsidInputComponent implements OnInit {
  @Input() selectedNetwork;
  @Output() changeSsidEvt = new EventEmitter<any>();
  public ssidFormControl = new FormControl('');
  ssid = '';
  error = '';
  constructor() {}

  ngOnInit() {}

  setSsid(value) {
    this.ssid = value;
  }
  setErrors() {
    this.ssidFormControl.setErrors({
      error: ''
    });
  }
  changeSsid(evt) {
    this.error = GeneralHelper.validadeSsid(this.ssid);
    if (this.error) {
      this.setErrors();
      return;
    }
    const data = {type: 'ssid', data: this.ssid};
    this.changeSsidEvt.emit(data);
  }
}
