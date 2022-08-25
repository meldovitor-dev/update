import { ProtocolService } from './../services/protocol.service';
import { FeatureSet, FeatureUnset } from './../actions/feature.action';
import { FeatureInterface } from './../domain/feature.interface';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';

export class FeatureStateModel {
    feature: FeatureInterface;
}

@State<FeatureStateModel>({
    name: 'featureState',
    defaults: {
        feature: undefined
    }
})

export class FeatureState {
    constructor(private store: Store, public protocolService: ProtocolService) { }
    @Selector()
    static getFeature(state: FeatureStateModel) {
        return state.feature;
    }
    @Action(FeatureSet)
    async setFeature({ setState }: StateContext<FeatureStateModel>, { payload }: any) {
        setState({
            feature: {
                ...payload,
                // ...{ protocol: this.protocolService.generateProtocol(payload) } // generate a protocol each feature setted
            }
        });
    }
    @Action(FeatureUnset)
    async unsetFeature({ setState }: StateContext<FeatureStateModel>) {
        setState({
            feature: undefined
        });
    }
}
