import { ConnectionChange } from './../actions/connection.actions';
import { ConnectionModel } from './../models/connection.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';

export class ConnectionStateModel {
    connection: ConnectionModel;
}

@State<ConnectionStateModel>({
    name: 'connection',
    defaults: {
        connection: {connected: true, connectionType: '4g'}
    }
})

export class ConnectionState {
    static propertyFilter(prop){
        const excluded = {
            cellular: '4g'
        };
        return (excluded[prop] || prop);
    }
    @Selector()
    static getConnection(state: ConnectionStateModel) {
        return state.connection;
    }
    @Action(ConnectionChange)
    update({ patchState }: StateContext<ConnectionStateModel>, {payload}: ConnectionChange) {
        const {connectionType, connected} = payload;
        const newConnectionState = {
            connected,
            connectionType: ConnectionState.propertyFilter(connectionType),
        };
        patchState({
            connection: newConnectionState
        });
    }
}
