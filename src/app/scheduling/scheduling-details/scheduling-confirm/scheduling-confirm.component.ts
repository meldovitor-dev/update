import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgendamentoActions } from 'src/app/domain/agendamento.interface';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tecvirt-scheduling-confirm',
    templateUrl: './scheduling-confirm.component.html',
    styleUrls: ['./scheduling-confirm.component.scss']
})
export class SchedulingConfirmComponent implements OnInit {
    @Input() agendamento;
    @Input() page;
    @Input() context: AgendamentoActions;
    @Output() confirmEvent = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }
    onClick(btn) {
        this.confirmEvent.emit(btn);
    }
    getTitle() {
        if (!this.page.title) {
            return '';
        }
        let txt = this.page.title;
        txt = txt.replace('#context#', this.getWordContext());
        txt = txt.replace('#contextRaw#', this.getWordContextRaw());
        return txt;
    }
    isCancelAction() {
        return this.context === AgendamentoActions.CANCELAR;
    }
    getTextCancel() {
        return `Pra concluir o reparo, agende uma nova visita técnica.`;
    }
    getWordContextRaw() {
        if (this.context === AgendamentoActions.CANCELAR) {
            return 'desmarcar';
        }
        return this.context;
    }

    getWordContext() {
        const candidate = {
            [AgendamentoActions.AGENDAR]: 'agendada',
            [AgendamentoActions.REAGENDAR]: 'reagendada',
            [AgendamentoActions.CANCELAR]: 'desmarcada',
        };
        return candidate[this.context] || '';
    }
}
