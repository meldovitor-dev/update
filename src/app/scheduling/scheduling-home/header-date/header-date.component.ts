import { Component, OnInit, Input } from '@angular/core';
import { SchedulingService } from '../../scheduling.service';

@Component({
    selector: 'tecvirt-header-date',
    template: `
    <div class="header-date-container" *ngIf="agendamento && !agendamento.isInvalido">
        <div class="header-date-content">
            <span class="header-date-content__top">
                {{agendamento.semana}}
            </span>
            <span class="header-date-content__bottom">
                {{agendamento.dia}}
            </span>
        </div>
        <div class="header-date-content">
            <span>
                {{agendamento.mes}}
            </span>
            <span>
                {{agendamento.ano}}
            </span>
        </div>
    </div>
    <div *ngIf="agendamento.isInvalido || agendamento.isPendente" class="header-pendent-or-expired">
        <span class="pendent-visit-icon">
        </span>
        <span [innerHTML]="getTitle()">
        </span>
    </div>
    <hr class="header-date-divider" >
  `,
    styleUrls: ['./header-date.component.scss']
})
export class HeaderDateComponent implements OnInit {
    @Input() agendamento;
    constructor(
        public sch: SchedulingService
    ) { }

    ngOnInit() {
    }
    getTitle() {
        if (this.agendamento && this.agendamento.isPendente) {
            return this.getTitlePendingCase();
        }
        return this.getTitleNonPendingCase();
    }
    getTitleNonPendingCase() {
        return `Você possui uma visita técnica de <strong>${this.agendamento.tipo_agendamento}</strong> agendada.`;
    }
    getTitlePendingCase() {
        if (this.sch.isScheduling(this.agendamento)) {
            return `Você possui uma visita técnica de <b to-lowercase>${this.agendamento.tipo_agendamento}</b> pra agendar.`;
        }
        if (this.sch.isReScheduling(this.agendamento)) {
            return `Você possui uma visita técnica de <strong>${this.agendamento.tipo_agendamento}</strong> que não foi realizada.`;
        }
        return `Você possui uma visita técnica de <b to-lowercase>${this.agendamento.tipo_agendamento}</b> em andamento.`;
    }

}
