import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  selector: 'tecvirt-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {
  @Input() page;
  @Output() backStepEvt = new EventEmitter<string>();
  @Output() dismissEvt = new EventEmitter<string>();

  constructor(public logg: AnalyticsService) { }

  ngOnInit() {
  }

  backStep() {
    this.logg.logEventGA('voltar', 'click');
    this.backStepEvt.emit('back');
  }
  dismiss() {
    this.logg.logEventGA('fechar', 'click');
    this.dismissEvt.emit('close');
  }
}
