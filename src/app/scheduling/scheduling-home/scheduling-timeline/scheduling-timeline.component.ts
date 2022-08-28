import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SchedulingService } from '../../scheduling.service';
import { SubSink } from 'subsink';


@Component({
  selector: 'tecvirt-scheduling-timeline',
  templateUrl: './scheduling-timeline.component.html',
  styleUrls: ['./scheduling-timeline.component.scss'],
})
export class SchedulingTimelineComponent implements OnChanges, OnDestroy {

  subs = new SubSink();
  @Input() agendamento;
  template = 'Você possui uma visita técnica de #reason#  agendada no período: #period#';
  defaultMessage = '';
  informations = [];
  constructor(public schedulingService: SchedulingService) {
    this.subs.add(
      this.schedulingService.loading$.subscribe(res => {
        if (!res) {
          this.updateMessage();
        }
      })
    );
  }


  ngOnChanges(sp: SimpleChanges) {
    this.updateMessage();
  }
  public getIconByReason() {
    if (this.agendamento.isPendente) {
      if (this.agendamento.isEditavel) {
        return 'agendarData';
      }
      return 'agendar';
    }
    if (this.agendamento.isInvalido) {
      return 'semData';
    }
    return 'agendado';
  }
  updateMessage() {
    this.informations = [];
    if (!this.agendamento) {
      return;
    }
    const insertTag = (msg = '') => {
      return `<strong>${msg}</strong>`;
    };
    const { tipo_agendamento, periodo } = this.agendamento;
    this.defaultMessage = this.template.replace('#reason#', insertTag(tipo_agendamento)).replace('#period#', insertTag(periodo));
    if (this.agendamento.dadosComplementares) {
      this.informations.push({
        message: this.agendamento.dadosComplementares,
        icon: 'tecnico'
      });
    }
    this.informations.push({
      message: this.agendamento.isPendente ? this.getAgendamentoDescriptionPendente() : this.getAgendamentoDescription(),
      icon: this.getIconByReason()
    });
    if (this.agendamento.visitaAnterior) {
      this.informations.push({
        message: this.agendamento.visitaAnterior,
        icon: 'historico'
      });
    }
  }
  public getAgendamentoDescription() {
    if (!this.agendamento.isInvalido) {
      return this.defaultMessage;
    }
    if (this.agendamento.isEditavel) {
      return `Não é possível exibir os detalhes do agendamento. Se quiser, você pode reagendar ou desmarcar a visita técnica.`;
    }
    return `Não é possível exibir os detalhes do agendamento. Pra saber mais, reagendar ou desmarcar a visita técnica, é necessário ligar pro nosso atendimento. `;
  }
  public getAgendamentoDescriptionPendente() {
    if (this.agendamento.isInvalido && !this.agendamento.isEditavel) {
      return `Pra reagendar em uma nova data e período, é necessário ligar pro nosso atendimento.`;
    }
    if (this.agendamento.isInvalido && this.agendamento.isEditavel) {
      return `Escolha a melhor data e período pra reagendarmos uma visita técnica.`;
    }
    if (this.agendamento.isEditavel) {
      return `Escolha a melhor data e período pra realizarmos uma visita técnica.`;
    }
    return `Aguarde a visita de um técnico que poderá ocorrer em até 48 horas.`;
  }
  public getTipoAgendamento(): string {
    return this.agendamento && this.agendamento.tipo_agendamento ? this.agendamento.tipo_agendamento : '';
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
