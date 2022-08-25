export class ScreenStateModel {
    screenName?: string;
    previousPage?: string;
    contextFlow?: string;
}
export class ScreenSet {
    static readonly type = '[Screen] Set';
    constructor(public payload: ScreenStateModel) {}
}
