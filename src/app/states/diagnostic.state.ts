import { State, Selector } from '@ngxs/store';

export class DiagnosticStateModel {
    diagnosticSteps: any[];
}

@State<DiagnosticStateModel>({
    name: 'diagnosticState',
    defaults: {
        diagnosticSteps: []
    }
})

export class AnalyticsState {
    @Selector()
    static getDiagnosticStepInfo(state: any) {
        return state.diagnosticSteps;
    }
}
