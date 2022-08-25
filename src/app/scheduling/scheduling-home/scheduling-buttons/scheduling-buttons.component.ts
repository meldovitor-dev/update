import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamentoActions } from 'src/app/domain/agendamento.interface';
import { CallService } from 'src/app/services/call.service';
import { SchedulingService } from '../../scheduling.service';

@Component({
    selector: 'tecvirt-scheduling-buttons',
    template: `
    <style>
        .schedulling-buttons__divider {
            background: #979797;
        }
        .schedulling-buttons__button {
            display: flex;
            justify-content: center
        }
        .schedulling-buttons__message {
            padding: 15px 0;
        }
        </style>
    <div class="schedulling-buttons">
        <hr class="schedulling-buttons__divider">
        <p *ngIf="!agendamento.isEditavel && !agendamento.isPendente" class="schedulling-buttons__message">
            Se quiser desmarcar ou reagendar a visita técnica, é necessário ligar pro nosso atendimento.
        </p>
        <div>
            <div *ngIf="(agendamento.isEditavel && hasId()); else noEditable">
                <tecvirt-button (clickEvent)="reagendar()"
                size="large" outline="true" [data]="{gaAction: 'reagendar'}" class="schedulling-buttons__button" *ngIf="isReScheduling() && !tecnicoaCaminho()">
                    Reagendar
                </tecvirt-button>
                <tecvirt-button (clickEvent)="desmarcar()"
                size="large" outline="true" [data]="{gaAction: 'desmarcar'}"
                class="schedulling-buttons__button" *ngIf="agendamento.isCancelavel && !agendamento.isPendente && !tecnicoaCaminho()">
                    Desmarcar
                </tecvirt-button>
                <tecvirt-button (clickEvent)="agendar()"
                size="large" outline="true" [data]="{gaAction: 'agendar'}" class="schedulling-buttons__button" *ngIf="isScheduling()">
                    Agendar
                </tecvirt-button>
            </div>
            <ng-template #noEditable>
                <tecvirt-button *ngIf="(!hasId() || (!agendamento.isPendente || (agendamento.isPendente && agendamento.isInvalido))) && !tecnicoaCaminho()"
                (clickEvent)="callToCallCenter()" outline="true" [data]="{gaAction: 'ligar'}"
                 size="large" class="schedulling-buttons__button">
                    Ligar
                </tecvirt-button>
            </ng-template>
    </div>
  `,
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
    tecnicoaCaminho(){
        return !!(this.agendamento && this.agendamento.noCallCenter)
    }
}
