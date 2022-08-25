import { AnalyticsService } from 'src/app/core/analytics.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tecvirt-stb-selector',
  templateUrl: './stb-selector.component.html',
  styleUrls: ['./stb-selector.component.scss'],
})
export class StbSelectorComponent implements OnInit {
  @Input() stbContent;
  @Output() buttonClickedEvt = new EventEmitter<any>();
  @Output() selectStbEvent = new EventEmitter<any>();
  currentSelected;
  anyStbDone = false;
  btnResetData = {gaAction: 'executar'};
  btnPularData = {gaAction: 'pular_etapa'};
  btnSuccessData = {gaAction: 'sem_mais_problemas'};
  constructor(public analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.anyStbDone = this.isAnyStbDone();
  }
  selectSTB(stb) {
    this.stbContent.map((el) => {
      if (stb === el) {
        el.checked = !el.checked;
        return;
      }
      el.checked = false;
    });
    this.currentSelected = this.stbContent.find(el => el.checked && !el.done);
  }
  isAnyStbDone() {
    return this.stbContent.some(el => el.done);
  }
  clickEvent() {
    this.selectStbEvent.emit(this.currentSelected);
    this.buttonClickedEvt.emit('requestResetSTB');
  }
  noMoreEvent() {
    this.buttonClickedEvt.emit('noMore');
  }
  successEvent() {
    this.buttonClickedEvt.emit('success');
  }
  findSTB() {
    this.analyticsService.logEventGA('orientacao_encontrar_numero_serie', 'click');
    this.buttonClickedEvt.emit('findSTB');
  }

}
