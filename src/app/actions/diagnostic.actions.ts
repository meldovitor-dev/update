export class DiagnosticAction {
    static readonly type = '[Diagnostic] Set';
    constructor(public payload: any) { }
}
