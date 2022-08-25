import { LocationAction } from './../actions/location.actions';
import { State, Selector, Action, StateContext } from '@ngxs/store';

export class LocationStateModel {
    location: string;
}

@State<LocationStateModel>({
    name: 'locationState',
    defaults: {
        location: ''
    }
})

export class LocationState {
    @Selector()
    static getLocation(state: LocationStateModel) {
        return state.location;
    }
    @Action(LocationAction)
    update({ setState }: StateContext<LocationStateModel>, {payload}: LocationAction) {
        const location = payload;
        setState({
            location
        });
    }
}

