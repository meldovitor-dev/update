import { Component, OnInit, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-scheduling-display',
  template: `
    <div class="tecvirt-scheduling-display">
        <hr *ngIf="agendamento.data">
        <span class="tecvirt-scheduling-display__label" *ngIf="agendamento.data">
            Data
        </span>
        <span *ngIf="agendamento.data">
            {{agendamento.data}}
        </span>
        <hr *ngIf="agendamento.turno">
        <span class="tecvirt-scheduling-display__label" *ngIf="agendamento.turno">
            Periodo
        </span>
        <span class="tecvirt-scheduling-display__multi-attr" *ngIf="agendamento.turno">
            <span>
                {{agendamento.turno}}
            </span>
            <span>
                {{agendamento.hora_ini}} - {{agendamento.hora_fim}}
            </span>
        </span>
        <hr *ngIf="agendamento.turno">
        <span class="tecvirt-scheduling-display__label">
            Tipo
        </span>
        <span>
            {{agendamento.tipo_agendamento}}
        </span>
        <hr>
    </div>
  `,
  styleUrls: ['./scheduling-display.component.scss']
})
export class SchedulingDisplayComponent implements OnInit {
@Input() agendamento;
  constructor() { }

  ngOnInit() {
  }

}
