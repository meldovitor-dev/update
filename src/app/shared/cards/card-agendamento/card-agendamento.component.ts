import { ServerMaintenanceService } from './../../../services/server-maintenance.service';
import { ProtocolService } from './../../../services/protocol.service';
import { Component, OnInit, Input, AfterContentInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FeatureSet } from 'src/app/actions/feature.action';
import { ProductService } from 'src/app/services/product.service';
import { InteractionEnum } from 'src/app/domain/interactions';
import { SubSink } from 'subsink';
import { TicketState } from 'src/app/states/ticket.state';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ConnectionState } from 'src/app/states/connection.state';
import { filter } from 'rxjs/operators';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { UserState } from 'src/app/states/user.state';

@Component({
    selector: 'tecvirt-card-agendamento',
    templateUrl: './card-agendamento.component.html',
    styleUrls: ['./card-agendamento.component.scss'],
})
export class CardAgendamentoComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
    @Input() feature;
    date;
    agendamentos = [];
    loading = false;
    validScheduling;
    subs = new SubSink();
    @Input() tickets;
    constructor(private router: Router,
                private store: Store,
                private productService: ProductService,
                private loginService: LoginService,
                private analyticsService: AnalyticsService,
                private protocolService: ProtocolService,
                private serverMaintenanceService: ServerMaintenanceService) { }


    ngOnChanges(change: SimpleChanges) {
        const { tickets } = change;
        if (tickets && tickets.currentValue) {
          const ticketObj = tickets.currentValue;
          this.handlerTickets(ticketObj);
        }
    }
    handlerTickets(ticketUpdate) {
        const consultaAgendamento = ticketUpdate[InteractionEnum.terminalAgendamentoConsulta];
        if (!consultaAgendamento) {
            return;
        }
        this.loading = consultaAgendamento.isEmExecucao;
        const { payload } = consultaAgendamento;
        if (!payload || !Object.keys(payload).length) {
            this.agendamentos = [];
            return;
        }
        const { agendamentos } = payload;
        this.agendamentos = agendamentos;
        this.validScheduling = this.agendamentos.find(el => !!el.when);
        this.date = new Date().getTime();
    }
    ngOnInit() {

    }

    ngAfterContentInit(): void {
    }
    async onClick() {
        this.publishGaEvent(this.feature);
        if (!this.store.selectSnapshot(ConnectionState.getConnection).connected || this.serverMaintenanceService.getMaintenance()) {
            const protocol = await this.protocolService.generateProtocol(this.feature);
            const featureObj = { protocol, ...this.feature}
            this.store.dispatch(new FeatureSet(featureObj));
            this.router.navigate(['home/sem-conexao', 'funcionalidades']);
            return;
        }
        if (this.loginService.isLoggedIn()) {
            this.dispatchAndNav();
            return;
        }
        this.askLogin();
    }
    getPeriod(periodo: string = '', n: number = 0) {
        if (periodo.split(']').length) {
            return periodo.split(']')[0].split('[')[n];
        }
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    isLoggedin() {
        return this.loginService.isLoggedIn();
    }
    async askLogin() {
        const loginOptions =  {};
        const cpfOrCnpj = this.store.selectSnapshot(UserState.getUserCpfOrCnpj);
        if (cpfOrCnpj) {
          // tslint:disable-next-line: no-string-literal
          loginOptions['cpfOrCnpj'] = cpfOrCnpj;
        }
        this.loginService.loginWithForm(LoginComponent, loginOptions).then((res: any) => {
          if (res.data && res.data.loginSuccess) {
            this.dispatchAndNav();
            return;
          }
          return;
        });
      }
      public async dispatchAndNav() {
        const protocol = await this.protocolService.generateProtocol(this.feature);
        const featureObj = { protocol, ...this.feature}
        this.store.dispatch(new FeatureSet(featureObj));
        this.router.navigate(['visitas_tecnicas']);
      }
      publishGaEvent(feature) {
        const { ga } = feature;
        if (ga) {
            this.analyticsService.logEventGA(ga, 'click');
        }
      }
      hiddenCnpj() {
          return this.isLoggedin() && GeneralHelper.keyCpfOrCnpj(this.loginService.getUser().cpfOrCnpj) === 'CNPJ';
      }
}
