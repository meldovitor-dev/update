import { Component, OnInit, Input, AfterContentInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SchedulingService } from '../../scheduling.service';
import { map, take, finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubSink } from 'subsink';
import { AgendamentoSlot, AgendamentoDisponibilidade, AgendamentoActions } from 'src/app/domain/agendamento.interface';
import {
  trigger,
  query,
  style,
  animate,
  transition,
  stagger,
} from '@angular/animations';
import { SCHEDULING_SLOT_PAGE } from './scheduling-slots.constants';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ScreenSet } from 'src/app/actions/screen.actions';

@Component({
  selector: 'tecvirt-scheduling-slots',
  templateUrl: './scheduling-slots.component.html',
  styleUrls: ['./scheduling-slots.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({ transform: 'translateX(-40px)', opacity: 0 }),
          stagger(100, [
            animate('200ms', style({ transform: 'translateX(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SchedulingSlotsComponent implements OnInit, AfterContentInit, OnDestroy {

  subs = new SubSink();
  slots = [];
  loading = true;
  public selectedDay: AgendamentoDisponibilidade;
  public selectedPeriod: AgendamentoSlot;
  public page: {
    title?: string,
    paragraph?: string,
    buttons?: any[],
    slots?: boolean,
    icon?: string,
  } = SCHEDULING_SLOT_PAGE.slots;
  @Input() agendamento;
  @Input() context;
  @Output() slotEvent = new EventEmitter<any>();
  constructor(public schedulingService: SchedulingService,
    public router: Router,
    public store: Store) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.subs.add(
      this.schedulingService.getDisponibilidade(this.agendamento).pipe(
        catchError(err => {
          this.context === AgendamentoActions.AGENDAR ?
            this.updatePage(SCHEDULING_SLOT_PAGE.semDisponibilidade) : this.updatePage(SCHEDULING_SLOT_PAGE.reagendarMaisTarde);
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        }),
        map(res => {
          return ((res as any).disponibilidade || []);
        })
      ).subscribe(res => {
        this.slots = res;
        this.resetSlots();
        if (!this.slots.length) {
          this.updatePage(SCHEDULING_SLOT_PAGE.semDisponibilidade);
        }
      })
    );
  }
  selectDay(idx: number) {
    this.resetSlots();
    this.slots[idx].selected = true;
    this.selectedDay = this.slots[idx];
  }
  selectPeriod(idx: number) {
    this.resetPeriods();
    this.selectedDay.periodos[idx].selected = true;
    this.selectedPeriod = this.selectedDay.periodos[idx];
  }
  updatePage(page) {
    const getGaContext = (context) => {
      const cadidates = {
        [AgendamentoActions.AGENDAR]: 'agendamento',
        [AgendamentoActions.REAGENDAR]: 'reagendamento',
        [AgendamentoActions.CANCELAR]: 'desmarcacao'
      };
      return cadidates[context] || '';
    };

    this.page = page;
    const { gaPageName } = page;
    this.store.dispatch(new ScreenSet({
      screenName: (gaPageName || '').replace('#context#', getGaContext(this.context))
    }));
    return;
  }
  resetSlots() {
    if (this.selectedPeriod) {
      this.selectedPeriod.selected = false;
    }
    this.slots.forEach(el => {
      el.selected = false;
    });
  }
  resetPeriods() {
    this.selectedDay.periodos.forEach(el => {
      el.selected = false;
    });
  }
  getDayMessage() {
    return this.selectedDay ? this.selectedDay.data : 'Selecione o dia da visita';
  }
  naoAtende() {
    this.schedulingService.setFeedbackDisponibilidade(this.agendamento)
      .pipe(take(1)).subscribe(res => {
        // publish feedback nao atende
      });
    if (!this.agendamento.isPendente) {
      this.updatePage(SCHEDULING_SLOT_PAGE.naoAtende);
      return;
    }
    this.context === AgendamentoActions.AGENDAR ?
      this.updatePage(SCHEDULING_SLOT_PAGE.agendarMaisTarde) : this.updatePage(SCHEDULING_SLOT_PAGE.reagendarMaisTarde);
  }
  proceed() {
    this.slotEvent.emit({
      date: this.selectedDay,
      slot: this.selectedPeriod
    });
  }
  isReagendarDisabled() {
    return (!this.selectedDay || !this.selectedPeriod || !this.selectedPeriod.selected);
  }
  onClick(btn) {
    const { action } = btn;
    this[action.call](action.params);
  }
  goToScheduling() {
    this.router.navigate(['visitas_tecnicas']);
  }
  goToHome() {
    this.router.navigate(['home']);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  cancelScheduling() {
    this.router.navigate([`visitas_tecnicas/${AgendamentoActions.CANCELAR}`, this.agendamento.id]);
  }
  getButtonText() {
    if (this.context === AgendamentoActions.REAGENDAR) {
      return 'Reagendar';
    }
    return 'Agendar';
  }

}
