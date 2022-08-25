import { ProductInterface } from '../domain/product.interface';
import { ProductSet, ProductUnset, ProductConfigSet } from './../actions/product.action';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';

export class ProductStateModel {
    product: ProductInterface;
    config: any;
}

@State<ProductStateModel>({
    name: 'productState',
    defaults: {
        product: undefined,
        config: undefined
    }
})

export class ProductState {
    constructor(private store: Store) { }
    @Selector()
    static getCurrentProduct(state: ProductStateModel) {
        return state.product;
    }
    @Selector()
    static getCurrentProductCode(state: ProductStateModel) {
        const { product } = state;
        return product ? product.productCode : 0;
    }
    @Selector()
    static getConfig(state: ProductStateModel) {
        const { config } = state;
        return config;
    }
    @Action(ProductSet)
    push({ patchState }: StateContext<ProductStateModel>, { payload }: any) {
        if (payload) {
            patchState({
                product: payload,
                config: undefined,
            });
        }
    }
    @Action(ProductUnset)
    pop({ patchState }: StateContext<ProductStateModel>, { payload }: any) {
        patchState({
            product: undefined,
            config: undefined
        });
    }
    @Action(ProductConfigSet)
    async fetchConfig({ getState, patchState }: StateContext<ProductStateModel>, { payload }: any) {
        const state = getState();
        if (payload) {
            patchState({
                config: JSON.stringify(payload)
            });
            return;
        }
        patchState({
            config: undefined
        });
        return;
    }
}
