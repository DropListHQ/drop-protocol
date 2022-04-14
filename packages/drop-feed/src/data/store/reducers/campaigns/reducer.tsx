import { CampaignsState, CampaignsActions } from './types';
import { Constants } from './constants';

const initialState: CampaignsState = {
  campaigns: []
}

export function dropsReducer(
  state: CampaignsState = initialState,
  action: CampaignsActions
): CampaignsState {
    switch (action.type) {
        case Constants.ADD_CAMPAIGNS:
          return {...state, campaigns: [ ...state.campaigns, action.payload ] }
        default:
            return state;
    }
}