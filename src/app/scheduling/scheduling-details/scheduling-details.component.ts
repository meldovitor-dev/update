/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import { Agendamento, AgendamentoActions, AgendamentoSlot } from 'src/app/domain/agendamento.interface';
import { SchedulingService } from '../scheduling.service';
import { of } from 'rxjs';
import { SCHEDULING_CONFIRM_PAGE } from './scheduling-confirm.contants';
import { CallService } from 'src/app/services/call.service';
import { Store } from '@ngxs/store';
import { ScreenSet } from 'src/app/actions/screen.actions';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tecvirt-scheduling-details',
    templateUrl: './scheduling-details.component.html',
    styleUrls: ['./scheduling-details.component.scss']
})
export class SchedulingDetailsComponent implements OnInit, OnDestroy {
    agendamento: Agendamento;
    newAgendamento: Agendamento;
    slot: AgendamentoSlot;
    loading = false;
    page;
    context = '';
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public schedulingService: SchedulingService,
        public callService: CallService,
        public store: Store
    ) { }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                of(this.schedulingService.getAgendamentoById(params.get('id'))))
        ).subscribe(res => {
            if (!res) {
                this.goToErrorPage();
                return;
            }
            this.agendamento = res;
            this.configPage();
        });

    }
    configPage() {
        const url = this.router.url;
        this.setContext(url);
        this.publishGA();
        if (url.includes(AgendamentoActions.REAGENDAR) || url.includes(AgendamentoActions.AGENDAR)) {
            this.fetchSlots();
            return;
        }
        this.loading = false;
        this.updatePage(SCHEDULING_CONFIRM_PAGE.cancelar);
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
    publishGA() {
        const getGaContext = (context) => {
            const cadidates = {
                [AgendamentoActions.AGENDAR]: 'agendamento',
                [AgendamentoActions.REAGENDAR]: 'reagendamento',
                [AgendamentoActions.CANCELAR]: 'cancelamento'
            };
            return cadidates[context] || '';
        };
        this.store.dispatch(new ScreenSet({
            screenName: `${this.context}_visita`,
            contextFlow: `${getGaContext(this.context)}`
        }));
        return;
    }
    setContext(url = '') {
        if (url.includes(AgendamentoActions.REAGENDAR)) {
            this.context = AgendamentoActions.REAGENDAR;
            return;
        }
        if (url.includes(AgendamentoActions.AGENDAR)) {
            this.context = AgendamentoActions.AGENDAR;
            return;
        }
        this.context = AgendamentoActions.CANCELAR;
    }
    fetchSlots() {
        return this.schedulingService.getDisponibilidade(this.agendamento).pipe(
            map(res => (res as any).disponibilidade),
            tap(res => {
                // console.log(res);
            }),
        );
    }
    backPage() {
        if (!this.page || this.context === AgendamentoActions.CANCELAR || this.page === SCHEDULING_CONFIRM_PAGE.errorId) {
            this.goToScheduling();
            return;
        }
        this.clearAuxVariables();
    }
    public goToScheduling() {
        this.router.navigate(['visitas_tecnicas']);
    }

    goToHome() {
        this.router.navigate(['home']);
    }
    setSlot(desireSlot) {
        this.slot = desireSlot.slot;
        this.newAgendamento = {
            tipo_agendamento: this.agendamento.tipo_agendamento,
            data: desireSlot.date.data,
            hora_ini: this.getHour('start'),
            hora_fim: this.getHour('end'),
            turno: this.slot.turno
        };
        this.setPageByContext();
    }

    public setPageByContext() {
        if (this.context === AgendamentoActions.AGENDAR) {
            this.updatePage(SCHEDULING_CONFIRM_PAGE.agendamento);
            return;
        }
        this.updatePage(SCHEDULING_CONFIRM_PAGE.reagendamento);
    }

    public getHour(when: string = '') {
        if (!this.slot) {
            return '';
        }
        if (when === 'start') {
            return this.slot.horario.split(' ')[0].replace('[', '');
        }
        return this.slot.horario.split(' ')[2].replace(']', '');
    }
    onClick(button) {
        const { action } = button;
        if (action) {
            this[action.call](action.params);
        }
    }
    public pickDates() {
        this.clearAuxVariables();
    }
    async scheduling(params?) {
        this.loading = true;
        try {
            const result = await this.schedulingService.setAgendamento(this.agendamento, this.slot).toPromise();
            this.updatePage(SCHEDULING_CONFIRM_PAGE.success);
            this.schedulingService.reloadTicketScheduling();
        } catch (e) {
            this.goToErrorPage();
        }
        this.loading = false;
    }
    async reScheduling(params?) {
        this.loading = true;
        try {
            const result = await this.schedulingService.setReagendamento(this.agendamento, this.slot).toPromise();
            this.updatePage(SCHEDULING_CONFIRM_PAGE.success);
            this.schedulingService.reloadTicketScheduling();
        } catch (e) {
            this.goToErrorPage();
        }
        this.loading = false;
    }
    async cancelScheduling(params?) {
        this.loading = true;
        try {
            const result = await this.schedulingService.deleteAgendamento(this.agendamento).toPromise();
            this.updatePage(SCHEDULING_CONFIRM_PAGE.success);
            this.schedulingService.reloadTicketScheduling();
        } catch (e) {
            this.goToErrorCancelPage();
        }
        this.loading = false;
    }
    callToCallCenter() {
        this.callService.callToCallCenter();
    }
    goToErrorPage() {
        if (!this.agendamento) {
            this.updatePage(SCHEDULING_CONFIRM_PAGE.errorId);
            return;
        }
        if (this.schedulingService.isFirstTry) {
            this.updatePage(SCHEDULING_CONFIRM_PAGE.errorOnce);
            this.schedulingService.isFirstTry = false;
            return;
        }
        this.updatePage(SCHEDULING_CONFIRM_PAGE.errorTwice);
    }
    goToErrorCancelPage() {
        if (this.schedulingService.isFirstTry) {
            this.updatePage(SCHEDULING_CONFIRM_PAGE.errorCancelOnce);
            this.schedulingService.isFirstTry = false;
            return;
        }
        this.updatePage(SCHEDULING_CONFIRM_PAGE.errorCancelTwice);
    }
    desmarcar() {
        this.updatePage(SCHEDULING_CONFIRM_PAGE.cancelar);
    }
    clearAuxVariables() {
        this.newAgendamento = undefined;
        this.page = undefined;
        this.slot = undefined;
    }
    ngOnDestroy() {
        this.clearAuxVariables();
        this.schedulingService.isFirstTry = true;
    }
}
