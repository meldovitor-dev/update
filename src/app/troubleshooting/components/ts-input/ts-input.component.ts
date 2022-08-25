import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tecvirt-ts-input',
  template: `
    <tecvirt-password-input *ngIf="type.password" [selectedNetwork]='selectedNetwork'(changePasswordEvt)='changePassword($event)'></tecvirt-password-input>
    <tecvirt-ssid-input *ngIf="type.ssid" [selectedNetwork]='selectedNetwork'(changeSsidEvt)='changeSsid($event)'></tecvirt-ssid-input>
    <tecvirt-phone-input *ngIf="type.phone" [selectedNetwork]='selectedNetwork'(changePhoneEvt)='changePhone($event)'></tecvirt-phone-input>

  `,
  styleUrls: ['./ts-input.component.scss'],
})
export class TsInputComponent implements OnInit {
  @Input() selectedNetwork = [];
  @Input() inputType: string;
  @Output() changeNetworkConfigEvt = new EventEmitter<any>();
  type = {password: false, ssid: false, phone: false};
  constructor() { }

  ngOnInit() {
    if (this.inputType === 'password') {
      this.type.password = true;
      return;
    }
    if (this.inputType === 'ssid') {
      this.type.ssid = true;
      return;
    }
    if (this.inputType === 'phone') {
      this.type.phone = true;
      return;
    }
  }

  changePassword(evt) {
    this.changeNetworkConfigEvt.emit(evt);
  }
  changeSsid(evt) {
    this.changeNetworkConfigEvt.emit(evt);
  }
  changePhone(evt) {
    this.changeNetworkConfigEvt.emit(evt);
  }
}
