import { State, Selector, Action, StateContext } from '@ngxs/store';
import { ScreenSet, ScreenStateModel } from '../actions/screen.actions';

@State<ScreenStateModel>({
    name: 'screenState',
    defaults: {
        screenName: 'selecao_produto',
        previousPage: 'selecao_produto',
        contextFlow: 'selecao_produto',
    }
})

export class ScreenState {
    @Selector()
    static getScreen(state: ScreenStateModel) {
        return state;
    }
    @Action(ScreenSet)
    setScreenName({ getState, patchState }: StateContext<ScreenStateModel>, { payload }: any) {
        const state = getState();
        if (payload) {
            const screenName = payload.screenName || state.screenName;
            const contextFlow = payload.contextFlow || state.contextFlow;
            let previousPage = state.previousPage;
            if (payload && payload !== state.screenName) {
                previousPage = state.screenName;
            }
            patchState({
                screenName,
                previousPage,
                contextFlow
            });
        }
    }
}
