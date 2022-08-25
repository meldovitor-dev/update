import { ConnectionModel } from './../models/connection.model';
export const CONNECTION_CHANGE_TYPE = '[Connection Action] Change';

export class ConnectionChange {
    static readonly type = CONNECTION_CHANGE_TYPE;
    constructor(public payload: ConnectionModel) {

    }
}
