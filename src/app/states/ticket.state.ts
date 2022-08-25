import { InteractionAsyncMethodsEnum } from './../domain/interactions';
import { ProductTicket } from './../models/product-ticket.model';
import { CreateTicketAction, UpdateTicketAction, DeleteTicketAction, CleanAllTicketsAction } from './../actions/ticket.actions';
import { State, Action, StateContext, Store, createSelector } from '@ngxs/store';
import { updateItem, patch } from '@ngxs/store/operators';

export class TicketStateModel {
    tickets: ProductTicket[];
}

@State<TicketStateModel>({
    name: 'ticketState',
    defaults: {
        tickets: []
    }
})

export class TicketState {
    constructor(private store: Store) { }
    static getTickets(id: string) {
        const selector = createSelector(
            [TicketState],
            (state) => state.tickets.find(s => s.contextIdentifier === id)
        );
        return selector;
    }
    static getTicketsByType(type: InteractionAsyncMethodsEnum) {
        const selector = createSelector(
            [TicketState],
            (state) => state.tickets.filter(s => s.responseMethod === type)
        );
        return selector;
    }
    static getAllAsyncTickets() {
        const selector = createSelector(
            [TicketState],
            (state) => state.tickets
                            .filter(s => s.responseMethod === InteractionAsyncMethodsEnum.poller ||
                                         s.responseMethod === InteractionAsyncMethodsEnum.socket) || []
        );
        return selector;
    }
    @Action(CreateTicketAction)
    push({ patchState, getState, setState }: StateContext<TicketStateModel>, { payload }: any) {
        if (!payload) {
            return;
        }
        const { tickets } = getState();
        if (!tickets.find(el => el.contextIdentifier === payload.contextIdentifier)) {
            patchState({
                tickets: [...tickets, payload]
            });
            return;
        }
        setState(
            patch({
                tickets: updateItem<ProductTicket>(ticket => ticket.contextIdentifier === payload.contextIdentifier, payload)
            })
        );
    }
    @Action(UpdateTicketAction)
    update({ setState }: StateContext<TicketStateModel>, { payload }: any) {
        setState(
            patch({
                tickets: updateItem<ProductTicket>(ticket => ticket.contextIdentifier === payload.contextIdentifier, payload)
            })
        );
    }
    @Action(DeleteTicketAction)
    remove({ getState, patchState }: StateContext<TicketStateModel>, { payload }: any) {
        patchState({
            tickets: getState().tickets.filter(el => el.contextIdentifier !== (payload.contextIdentifier || payload))
        });
    }
    @Action(CleanAllTicketsAction)
    clean({ setState }: StateContext<TicketStateModel>, { payload }: any) {
        setState({
            tickets: []
        });
    }
}
