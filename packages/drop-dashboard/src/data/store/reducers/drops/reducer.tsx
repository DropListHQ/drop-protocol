import { DropsState, DropsActions } from './types';
import { Constants } from './constants';

const initialState: DropsState = {
  retroDrops: []
}

export function dropsReducer(
  state: DropsState = initialState,
  action: DropsActions
): DropsState {
    switch (action.type) {
        case Constants.DROP_ADD_NEW_RETRO_DROP:
          return {...state, retroDrops: [ ...state.retroDrops, action.payload ] }
        default:
            return state;
    }
}