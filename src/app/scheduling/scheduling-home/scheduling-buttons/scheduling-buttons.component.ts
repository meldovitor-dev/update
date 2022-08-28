import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamentoActions } from 'src/app/domain/agendamento.interface';
import { CallService } from 'src/app/services/call.service';
import { SchedulingService } from '../../scheduling.service';

@Component({
  selector: 'tecvirt-scheduling-buttons',
  template: '',
  styles: []
})
export class SchedulingButtonsComponent implements OnInit {

  @Input() agendamento;
  constructor(
    public router: Router,
    public callService: CallService,
    public schService: SchedulingService) { }

  ngOnInit() {
  }
  desmarcar() {
    this.navWithId(AgendamentoActions.CANCELAR);
  }
  reagendar() {
    this.navWithId(AgendamentoActions.REAGENDAR);
  }
  agendar() {
    this.navWithId(AgendamentoActions.AGENDAR);
  }
  navWithId(reason) {
    const id = this.agendamento.id;
    this.router.navigate([`visitas_tecnicas/${reason}`, id]);
  }
  callToCallCenter() {
    this.callService.callToCallCenter();
  }
  isScheduling() {
    return this.schService.isScheduling(this.agendamento);
  }
  isReScheduling() {
    return this.schService.isReScheduling(this.agendamento);
  }
  hasId() {
    return !!this.agendamento.id;
  }
  tecnicoaCaminho() {
    return !!(this.agendamento && this.agendamento.noCallCenter)
  }

}
