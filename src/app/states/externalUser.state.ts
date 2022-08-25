import { ExternalUserSet, ExternalUserUnset, ExternalNovaFibra } from './../actions/externalUser.action';
import { State, Action, StateContext, createSelector, Selector } from '@ngxs/store';
import { User } from '../models/user.model';
import { ProductCodeEnum } from '../enums/product.enum';

export class ExternalUserStateModel {
  [ProductCodeEnum.BANDA_LARGA]: User[];
  [ProductCodeEnum.FIXO]: User[];
  [ProductCodeEnum.TVDTH]: User[];
  [ProductCodeEnum.FIBRA]: User[];
  novaFibra: any[];
}

@State<ExternalUserStateModel>({
  name: 'externalUserState',
  defaults: {
    [ProductCodeEnum.BANDA_LARGA]: [],
    [ProductCodeEnum.FIXO]: [],
    [ProductCodeEnum.TVDTH]: [],
    [ProductCodeEnum.FIBRA]: [],
    novaFibra: [],
  }
})

export class ExternalUserState {
    constructor() { }
    static getExternalUser(productCode: number) {
      const selector = createSelector(
        [ExternalUserState],
        (state) => state[productCode]
      );
      return selector;
    }
    @Action(ExternalUserSet)
    async setExternalUsers({ setState }: StateContext<ExternalUserStateModel>, { payload }: any) {
      setState({
        ...payload
      });
    }
    @Action(ExternalUserUnset)
    async unsetExternalUser({ patchState }: StateContext<ExternalUserStateModel>, { productCode }: any) {
      patchState({
        [productCode]: []
      });
    }
    @Action(ExternalNovaFibra)
    async setExternalUsersNovaFibra({ patchState }: StateContext<ExternalUserStateModel>, { payload }: any) {
      patchState({
        novaFibra: payload
      });
    }
    @Selector()
    static getNovaFibra(state: ExternalUserStateModel) {
        return state.novaFibra;
    }
}
