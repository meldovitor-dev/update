import { TsHandler } from './ts-handler';
import { Store } from '@ngxs/store';
import { TicketState } from 'src/app/states/ticket.state';
import { InteractionEnum } from 'src/app/domain/interactions';

export class TsTvHandler extends TsHandler {
  checkPulseSendingAvailability(store: Store) {
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.tvConsultaStatus));
    if (ticket && ticket.payload) {
      const pulseSending = ticket.payload;
      return {
        permission: pulseSending.enviaPulso,
        forecast: pulseSending.tempoPermissao
      };
    }
    return {};
  }
}
