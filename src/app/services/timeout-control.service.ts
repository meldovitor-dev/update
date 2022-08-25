import { ConnectionState } from './../states/connection.state';
import { UpdateTicketAction } from './../actions/ticket.actions';
import { CountdownTimer } from './../shared/countdown-timer';
import { TicketState } from './../states/ticket.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeoutControlService {

  private countdownList: CountdownTimer[] = [];
  constructor(public store: Store) { }
  public registerTimeout(id: string, timeout: number): CountdownTimer {
    const cdObj = this.countdownList.find(el => el.id === id);
    if (!cdObj) {
      const newObj = new CountdownTimer(id, timeout);
      newObj.start();
      newObj.on('finish', r => {
        this.updateTicket(id);
      });
      this.countdownList.push(newObj);
      return newObj;
    }
    const idx = this.countdownList.indexOf(cdObj);
    this.countdownList[idx].reset();
    return this.countdownList[idx];
  }
  updateTicket(ticketId) {
    const tickets = this.store.selectSnapshot(TicketState.getAllAsyncTickets());
    const ticket = tickets.find(t => t.contextIdentifier === ticketId);
    if (ticket && ticket.isEmExecucao && !ticket.result) {
      const { connected } = this.store.selectSnapshot(ConnectionState.getConnection);
      this.store.dispatch(
        new UpdateTicketAction({
          ...ticket,
          ...{
            isEmExecucao: false,
            result: connected ? 'timeout' : 'offline'
          }
        })
      );
      return;
    }
  }
  getCountdown(id: string) {
    const obj = this.countdownList.find(el => el.id === id);
    if (!obj) {
      return undefined;
    }
    const idx = this.countdownList.indexOf(obj);
    return this.countdownList[idx];
  }
  finish(id: string) {
    if (this.getCountdown(id)) {
      this.getCountdown(id).stop();
      this.getCountdown(id).emit('finish');
    }
  }
}
