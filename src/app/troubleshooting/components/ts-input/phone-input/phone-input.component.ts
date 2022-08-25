import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit {
  @Input() selectedNetwork;
  @Output() changePhoneEvt = new EventEmitter<any>();
  public phoneFormControl = new FormControl('');
  phone = '';
  error = '';
  btnData = {gaAction: 'seguir'};
  constructor(public loggProvider: AnalyticsService) {}

  ngOnInit() {}

  setPhone(value) {
    this.phone = value;
  }
  setErrors() {
    this.phoneFormControl.setErrors({
      error: ''
    });
  }
  publishGaAction(evt: string, label) {
    this.loggProvider.logEventGA(evt, label);
  }
  changePhone(evt) {
    this.error = GeneralHelper.validadePhone(this.phone);
    if (this.error) {
      this.setErrors();
      const gaLabel = 'erro_cpf_cnpj_invalido';
      const label = 'visualizou';
      this.publishGaAction(gaLabel, label);
      return;
    }
    const data = {type: 'phone', data: this.phone.match(/[0-9]/g).join('')};
    this.changePhoneEvt.emit(data);
  }
}
