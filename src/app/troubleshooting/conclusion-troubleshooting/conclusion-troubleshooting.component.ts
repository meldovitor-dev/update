import { ConclusionModel, ButtonCatalogModel } from './../troubleshooting-interface';
import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { getConclusion } from './conclusion-catalog';
import { ScreenSet, ScreenStateModel } from 'src/app/actions/screen.actions';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-conclusion-troubleshooting',
  templateUrl: './conclusion-troubleshooting.component.html',
  styleUrls: ['./conclusion-troubleshooting.component.scss']
})
export class ConclusionTroubleshootingComponent implements OnInit {
  @Output() btnEvt = new EventEmitter<any>();
  @Input() conclusionParams;
  content: ConclusionModel = {
    id: 'default',
    gaPageName: 'nao_sucesso',
    title: 'Não foi possível resolver esse problema por aqui.',
    paragraph:
      'Um dos nossos especialistas pode te ajudar. A ligação é gratuita.',
    buttons: [
      {
        text: 'Ligar',
        gaAction: 'ligar',
        action: 'goToCallCenter'
      },
      {
        text: 'Voltar pro início',
        gaAction: 'voltar_inicio',
        action: 'goToHome'
      }
    ]
  };
  constructor(
    public store: Store
  ) {}

  ngOnInit() {
    if (this.conclusionParams && this.conclusionParams.id) {
      this.content = getConclusion(this.conclusionParams.id);
    }
    const analytics: ScreenStateModel = {
      screenName: this.content.gaPageName,
    };
    if (this.content.fluxo) {
      analytics.contextFlow = this.content.fluxo;
    }
    this.store.dispatch(new ScreenSet(analytics));
  }
  onClick(btn: ButtonCatalogModel) {
    const params = {btn};
    if (this.conclusionParams && this.conclusionParams.continueId) {
      const key = 'continueId';
      params[key] = this.conclusionParams.continueId;
    }
    this.btnEvt.emit(params);
  }
}
