import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware } from 'redux';

import { userReducer } from './reducers/user/reducer';
import { dropsReducer } from './reducers/campaigns/reducer'
import { communitiesReducer } from './reducers/communities/reducer'

import { setProps, getLocalStore, setLocalStore } from './local-storage-redux'
import { UserState } from './reducers/user/types';
import { CampaignsState } from './reducers/campaigns/types';
import { CommunitiesState } from './reducers/communities/types';


import { tokenReducer } from './reducers/token/reducer'
import { campaignReducer } from './reducers/campaign/reducer'

// import { setProps, getLocalStore, setLocalStore } from './local-storage-redux'
import { TokenState } from './reducers/token/types';
import { CampaignState } from './reducers/campaign/types';

export const history = createBrowserHistory()
setProps(['drops'])

export interface RootState {
  user: UserState,
  campaigns: CampaignsState,
  communities: CommunitiesState,
  token: TokenState,
  campaign: CampaignState
}

const store = createStore<RootState, any, any, any>(
  combineReducers({
    user: userReducer,
    campaigns: dropsReducer,
    communities: communitiesReducer,
    token: tokenReducer,
    campaign: campaignReducer
  }),
  getLocalStore()
)

function init () {
  setLocalStore(store)
}
store.subscribe(init)
init()

export default store;