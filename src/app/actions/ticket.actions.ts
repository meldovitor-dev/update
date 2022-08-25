export class CreateTicketAction {
    static readonly type = '[Ticket] Create';
    constructor(public payload: any) {}
}

export class UpdateTicketAction {
    static readonly type = '[Ticket] Update';
    constructor(public payload: any) {}
}
export class DeleteTicketAction {
    static readonly type = '[Ticket] Delete';
    constructor(public payload: any) {}
}
export class CleanAllTicketsAction {
    static readonly type = '[Ticket] Clean';
    constructor() {}
}
