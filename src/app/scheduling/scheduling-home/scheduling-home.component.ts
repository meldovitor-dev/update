import { Component, OnInit, AfterContentInit } from '@angular/core';
import { SchedulingService } from '../scheduling.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FeatureUnset } from 'src/app/actions/feature.action';
import { Agendamento } from 'src/app/domain/agendamento.interface';
import { ScreenSet } from 'src/app/actions/screen.actions';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'tecvirt-scheduling-home',
  templateUrl: './scheduling-home.component.html',
  styleUrls: ['./scheduling-home.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({ transform: 'translateX(-50px)', opacity: 0 }),
          stagger(500, [
            animate('150ms', style({ transform: 'translateX(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SchedulingHomeComponent implements OnInit {

  constructor(
    public schedulingService: SchedulingService,
    public router: Router,
    public store: Store,
    public logg: AnalyticsService) { }

  async ngOnInit() {
    this.store.dispatch(new ScreenSet({
      screenName: 'consultar_visitas_tecnicas',
      contextFlow: 'agendamento'
    }));
    await this.schedulingService.loading$.pipe(
      filter(l => !l),
      take(1),
    ).toPromise()
    const agendamento = this.getAgendamentos()
    if (agendamento && Array.isArray(agendamento) && (agendamento.length === 0)) {
      const action = this.schedulingService.error ? 'falha_consulta' : 'sem_visitas_tecnicas'
      this.logg.logEventGA(action, 'visualizou');
    }
    agendamento.forEach(sch => {
      const action = this.resolveActionGa(sch);
      this.logg.logEventGA(action, 'visualizou');
    });
  }

  resolveActionGa(sch: Agendamento) {
    const prefix = (sch.isReparo ? 'reparo' : 'servico');
    let posfix = '';
    if (sch.isPendente && !sch.isInvalido && sch.isEditavel) {
      posfix = '_a_agendar';
      return prefix + posfix;
    }
    if (sch.isPendente && !sch.isInvalido && !sch.isEditavel) {
      posfix = '_em_andamento';
      return prefix + posfix;
    }
    if (!sch.isPendente && sch.isInvalido && sch.isEditavel) {
      posfix = '_agendado';
      return prefix + posfix;
    }
    if (!sch.isPendente && sch.isInvalido && !sch.isEditavel) {
      posfix = '_invalido_reagendamento_indisponivel';
      return prefix + posfix;
    }
    if (!sch.isPendente && !sch.isInvalido && sch.isEditavel) {
      posfix = '_agendado_reagendamento_disponivel';
      return prefix + posfix;
    }
    if (!sch.isPendente && !sch.isInvalido && !sch.isEditavel) {
      posfix = '_agendado_reagendamento_indisponivel';
      return prefix + posfix;
    }
  }

  getAgendamentos() {
    return [
      ...this.setCategory(this.getPendingScheduling()),
      ...this.setCategory(this.getNonPendingScheduling()),
    ];
  }
  setCategory(agendamentos: Agendamento[]) {
    if (agendamentos && agendamentos.length) {
      agendamentos[0].categoryTitle = this.getCategoryTxt(agendamentos[0]);
    }
    return agendamentos;
  }

  getPendingScheduling() {
    return (this.schedulingService ? this.schedulingService.getAgendamentos() : [])
      .filter(el => el.isPendente);
  }
  getCategoryTxt(prop) {
    if (prop && prop.isPendente) {
      return 'Pendentes de agendamento';
    }
    return 'Agendadas';
  }
  getNonPendingScheduling() {
    return (this.schedulingService ? this.schedulingService.getAgendamentos() : [])
      .filter(el => !el.isPendente);
  }
  goToHome() {
    this.router.navigate(['home']).finally(() => {
      this.store.dispatch(new FeatureUnset());
    });
  }

}
