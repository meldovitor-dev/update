import { AddMinhaOiToken, ClearMinhaOiToken, AddProductToken, ClearProductToken } from './../actions/utility.actions';
import { State, Selector, Action, StateContext, createSelector } from '@ngxs/store';
import { UtilitySet, UtilityUnset, PatchHomeTickets, ClearHomeTickets, ClearDiagnosticConclusion, AddDiagnosticConclusion, AddUrlParams, ClearUrlParams } from '../actions/utility.actions';
import { UtilityModel } from '../models/utility.model';
import { ProductTicket } from '../models/product-ticket.model';

@State<UtilityModel>({
    name: 'utilityState',
    defaults: {
        firebaseToken: '',
        homeTickets: {},
        diagnosticConclusion: {},
    }
})

export class UtilityState {
    static getHomeTicketsById(id: string) {
        const selector = createSelector(
            [UtilityState],
            (state) => {
                const { homeTickets } = state;
                return homeTickets[id] || undefined;
            }
        );
        return selector;
    }
    static getHomeTickets() {
        const selector = createSelector(
            [UtilityState],
            (state) => {
                const { homeTickets } = state;
                return homeTickets;
            }
        );
        return selector;
    }
    @Selector()
    static getFirebaseToken(state: UtilityModel) {
        return state.firebaseToken;
    }
    @Selector()
    static getDiagnosticConclusion(state: UtilityModel) {
        return state.diagnosticConclusion;
    }
    @Selector()
    static getUrlParams(state: UtilityModel) {
        return state.urlParams;
    }
    @Selector()
    static getMinhaOiToken(state: UtilityModel) {
        return state.minhaOiToken;
    }
    @Selector()
    static getProductToken(state: UtilityModel) {
        return state.prodToken;
    }

    @Action(UtilitySet)
    set({ getState, setState }: StateContext<UtilityModel>, { payload }: any) {
        const state = getState();
        if (payload) {
            const firebaseToken = payload.firebaseToken || state.firebaseToken;
            setState({
                firebaseToken
            });
        }
    }
    @Action(UtilityUnset)
    unSet({ getState, patchState }: StateContext<UtilityModel>) {
        const state = getState();
        patchState({
            firebaseToken: ''
        });
    }
    @Action(PatchHomeTickets)
    patchHomeTickets({ getState, patchState }: StateContext<UtilityModel>, { payload }: any) {
        const state = getState();
        const { homeTickets } = state;
        const payloadToObj = (p: ProductTicket) => {
            const obj = {
                [p.contextIdentifier]: p
            };
            return obj;
        };
        patchState({
            homeTickets: {
                ...homeTickets,
                ...payloadToObj(payload)
            }
        });
    }
    @Action(ClearHomeTickets)
    clearHomeTickets({ patchState }: StateContext<UtilityModel>) {
        patchState({
            homeTickets: {}
        });
    }
    @Action(AddDiagnosticConclusion)
    addDiagnostic({ patchState }: StateContext<UtilityModel>, { payload }: any) {
        patchState({
            diagnosticConclusion: payload
        });
    }
    @Action(ClearDiagnosticConclusion)
    clearDiagnostic({ patchState }: StateContext<UtilityModel>) {
        patchState({
            diagnosticConclusion: {}
        });
    }
    @Action(AddUrlParams)
    addUrlParams({ patchState }: StateContext<UtilityModel>, { payload }: any) {
        patchState({
            urlParams: payload
        });
    }
    @Action(ClearUrlParams)
    clearUrlParams({ patchState }: StateContext<UtilityModel>) {
        patchState({
          urlParams: {}
        });
    }
    @Action(AddMinhaOiToken)
    addMinhaOiToken({ patchState }: StateContext<UtilityModel>, { payload }: any) {
        const { token } = payload;
        patchState({
            minhaOiToken: token
        });
    }
    @Action(ClearMinhaOiToken)
    clearMinhaOiToken({ patchState }: StateContext<UtilityModel>) {
        patchState({
          minhaOiToken: ''
        });
    }
    @Action(AddProductToken)
    addProductToken({ patchState }: StateContext<UtilityModel>, { payload }: any) {
        const { prodtoken } = payload;
        patchState({
            prodToken: prodtoken
        });
    }
    @Action(ClearProductToken)
    clearProductToken({ patchState }: StateContext<UtilityModel>) {
        patchState({
          prodToken: ''
        });
    }
}
