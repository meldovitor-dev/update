/* eslint-disable @typescript-eslint/member-ordering */
import { FormControl } from '@angular/forms';
import { GeneralHelper } from '../../../../helpers/general.helper';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
  public showPassword;
  public password = '';
  public rePassword = '';
  public error = '';
  public passwordFormControl = new FormControl('');
  public rePasswordFormControl = new FormControl('');

  @Input() selectedNetwork;
  @Output() changePasswordEvt = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  setPassword(value) {
    this.password = value;
  }
  setRePassword(value) {
    this.rePassword = value;
  }
  setErrors() {
    this.passwordFormControl.setErrors({
      error: ''
    });
    this.rePasswordFormControl.setErrors({
      error: ''
    });
  }

  changePassword(evt) {
    this.error = GeneralHelper.validadePassword([this.password, this.rePassword]);
    if (this.error) {
      this.setErrors();
      return;
    }
    const data = {type: 'password', data: this.password};
    this.changePasswordEvt.emit(data);
  }
}
