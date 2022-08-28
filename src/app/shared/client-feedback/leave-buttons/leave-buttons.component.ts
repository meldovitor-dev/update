import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AnalyticsService } from 'src/app/core/analytics.service';

export const  USER_ACTIONS = {
  RATE_NOW: 1,
  NOT_NOW: 2,
  NO_THANKS: 3,
};

@Component({
  selector: 'tecvirt-leave-buttons',
  templateUrl: './leave-buttons.component.html',
  styleUrls: ['./leave-buttons.component.scss'],
})
export class LeaveButtonsComponent implements OnInit {

  buttonlist = [
    {
      id: USER_ACTIONS.RATE_NOW,
      label: 'Avaliar agora',
      gaAction: 'avaliar_agora',
    },
    {
      id: USER_ACTIONS.NOT_NOW,
      label: 'Lembrar mais tarde',
      gaAction: 'lembrar_mais_tarde',
    },
    {
      id: USER_ACTIONS.NO_THANKS,
      label: 'Não, obrigado!',
      gaAction: 'nao_avaliar',
    }
  ];

  @Output() buttonEvt = new EventEmitter<any>();
  constructor(private lstorage: LocalstorageService,
    public analyticsService: AnalyticsService) { }

  ngOnInit() {
  }
  handleButtonClicked(evt) {
    this.publishEventGA(evt)
    const handleAction = {
      [USER_ACTIONS.NO_THANKS]: () => this.resolveStorage(),
      [USER_ACTIONS.NOT_NOW]: () => this.sendEvt({ call: 'dismiss' }),
      [USER_ACTIONS.RATE_NOW]: () => this.sendEvt({ call: 'goToFirstPage' })
    };
    handleAction[evt.id]();
  }
  sendEvt(evt) {
    this.buttonEvt.emit(evt);
  }
  resolveStorage() {
    this.lstorage.setItem('fr', true);
    this.sendEvt({ call: 'dismiss' });
  }
  publishEventGA(btn) {
    if (!btn.gaAction) {
      return;
    }
    this.analyticsService.logEventGA(btn.gaAction, 'click');
  }

}
