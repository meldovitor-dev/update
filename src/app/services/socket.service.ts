import { TimeoutControlService } from './timeout-control.service';
import { InteractionAsyncMethodsEnum } from './../domain/interactions';
import { UpdateTicketAction } from './../actions/ticket.actions';
import { TicketState } from './../states/ticket.state';
import { Store } from '@ngxs/store';
import { LoginService } from './login.service';
import { TECNICO_VIRTUAL_API } from './../../environments/server-urls';
import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  private tickets;
  constructor(public loginService: LoginService,
    public store: Store,
    public timeoutService: TimeoutControlService) { }

  public init() {
    this.store.select(TicketState.getTicketsByType(InteractionAsyncMethodsEnum.socket)).subscribe(tickets => {
      this.tickets = tickets;
      this.emitTickets();
    });
  }
  public emitTickets() {
    this.tickets.forEach(element => {
      const { id, payload, result, isEmExecucao } = element;
      if (!payload && !result && isEmExecucao) {
        this.emit(id);
      }
    });

  }

  public connect() {
    console.log('start connection on socket');
    this.disconnect();
    const token = this.loginService.getUserToken();
    this.socket = io(TECNICO_VIRTUAL_API.socketTicket, { query: { token } });
    this.socket.on('/ticketListening', (data) => {
      console.warn('BE ==> ', data);
      const { id, status, isEmExecucao } = data;
      if (status && id && !isEmExecucao) {
        const t = this.tickets.find(el => (el.id === data.id && el.isEmExecucao));
        if (t) {
          this.updateTicket(t, status);
        }
      }
    });
    this.socket.on('reconnect', (data) => {
      this.emitTickets();
    });
    this.socket.on('disconnect', (data) => {
      console.log('i am disconnected', data);
    });
    this.socket.on('connect', (data) => {
      console.log('i am connected', data);
    });
    this.socket.on('error', (data) => {
      console.log('i am error', data);
    });

  }
  public async updateTicket(ticket, status) {
    const updatedTicket = {
      ...ticket,
      ... {
        isEmExecucao: false,
        payload: status
      }
    };
    await this.store.dispatch(new UpdateTicketAction(updatedTicket));
    this.timeoutService.finish(updatedTicket.contextIdentifier);
  }
  public emit(ticketId) {
    console.log('emiting ', ticketId);
    this.socket.emit('/ticketListening', { ticketId });
  }
  public isConnected() {
    return !!this.socket;
  }
  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  public refreshConnection() {
    this.connect();
  }
}
