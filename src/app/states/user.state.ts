import { ProductState } from './product.state';
import { ProductCodeEnum } from './../enums/product.enum';
import { User } from './../models/user.model';
import { UserSet, UserUnset, UserPatch, UserUnlogged, UserSessionSet, UserCpfOrCnpjSet } from './../actions/user.actions';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
export class UserStateModel {
    userSession: User[];
    session: number;
    cpfOrCnpj?: string;
}

@State<UserStateModel>({
    name: 'userState',
    defaults: {
        session: 0,
        userSession: [{
            productCode: ProductCodeEnum.BANDA_LARGA
        },
        {
            productCode: ProductCodeEnum.FIXO
        },
        {
            productCode: ProductCodeEnum.TVDTH
        },
        {
            productCode: ProductCodeEnum.FIBRA
        }]
    }
})

export class UserState {
    constructor(public store: Store) { }
    @Selector()
    static getUser(state: UserStateModel) {
        return state.userSession[state.session];
    }
    @Selector()
    static getAllUsers(state: UserStateModel) {
        return state.userSession;
    }
    @Selector()
    static getUserCpfOrCnpj(state: UserStateModel) {
        return state.cpfOrCnpj;
    }
    @Action(UserSet)
    push({ getState, patchState, setState }: StateContext<UserStateModel>, { payload }: any) {
        const state = getState();
        const currentProduct = this.store.selectSnapshot(ProductState.getCurrentProductCode);
        let user = state.userSession.find(el => el.productCode === currentProduct);
        const session = state.userSession.indexOf(user);
        user = {
            ...payload
        };
        const updatedArray = JSON.parse(JSON.stringify(state.userSession)); // Necessario pois os estados deveriam ser read only
        updatedArray[session] = user;
        setState({
            session,
            userSession: updatedArray
        });

    }
    @Action(UserUnset)
    pop(ctx: StateContext<UserStateModel>, { payload }: any) {
        const state = ctx.getState();
        const user = state.userSession.find(el => el.productCode === payload.productCode);
        const session = state.userSession.indexOf(user);
        const updatedArray = JSON.parse(JSON.stringify(state.userSession)); // Necessario pois os estados deveriam ser read only
        updatedArray[session] = {
            productCode: updatedArray[session].productCode
        };
        ctx.setState({
            session,
            userSession: updatedArray
        });


    }
    @Action(UserPatch)
    patch({ getState, setState }: StateContext<UserStateModel>, { payload }: any) {
        const state = getState();
        let user = state.userSession.find(el => el.productCode === payload.productCode);
        const session = state.userSession.indexOf(user);
        user = {
            ...payload
        };
        const updatedArray = JSON.parse(JSON.stringify(state.userSession)); // Necessario pois os estados deveriam ser read only
        updatedArray[session] = user;
        setState({
            session,
            userSession: updatedArray
        });

    }
    @Action(UserUnlogged)
    pushEmpty({ getState, setState }: StateContext<UserStateModel>, { payload }: any) {
        const state = getState();
        let user = state.userSession.find(el => el.productCode === payload.productCode);
        const session = state.userSession.indexOf(user);
        user = {
            ...payload
        };
        const updatedArray = JSON.parse(JSON.stringify(state.userSession)); // Necessario pois os estados deveriam ser read only
        updatedArray[session] = user;
        setState({
            session,
            userSession: updatedArray
        });
    }
    @Action(UserSessionSet)
    setUserSession({ patchState, getState }: StateContext<UserStateModel>, payload: ProductCodeEnum) {
        const state = getState();
        const currentProduct = this.store.selectSnapshot(ProductState.getCurrentProductCode);
        const user = state.userSession.find(el => el.productCode === currentProduct);
        const session = state.userSession.indexOf(user);
        patchState({
            session
        });
    }

    @Action(UserCpfOrCnpjSet)
    setUserCpfOrCnpjSet({ patchState, getState }: StateContext<UserStateModel>, {payload}: any) {
        const cpfOrCnpj = payload;
        patchState({
            cpfOrCnpj
        });
    }
}
