import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AppSet } from '../actions/app.actions';

export class AppStateModel {
    version: string;
    channel: string;
    formatedVersion?: string;
    build?: string;
}

@State<AppStateModel>({
    name: 'appState',
    defaults: {
        version: '0.0.1',
        channel: 'TecnicoVirtual-App',
        formatedVersion: '',
        build: ''
    }
})

export class AppState {
    @Selector()
    static getApp(state: AppStateModel) {
        return state;
    }
    @Action(AppSet)
    set({ getState, setState }: StateContext<AppStateModel>, { payload }: any) {
        const state = getState();
        if (payload) {
            const version = payload.version || state.version;
            const channel = payload.channel || state.channel;
            const formatedVersion = payload.formatedVersion || state.formatedVersion;
            const build = payload.build || state.build;
            setState({
                version,
                channel,
                formatedVersion,
                build,
            });
        }
    }
}
