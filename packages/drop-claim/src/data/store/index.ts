import { createBrowserHistory } from 'history'
import { combineReducers, createStore } from 'redux';

import { userReducer } from './reducers/user/reducer';
import { tokenReducer } from './reducers/token/reducer'
import { dropReducer } from './reducers/drop/reducer'

// import { setProps, getLocalStore, setLocalStore } from './local-storage-redux'
import { UserState } from './reducers/user/types';
import { TokenState } from './reducers/token/types';
import { DropState } from './reducers/drop/types';

export const history = createBrowserHistory()
// setProps(['drops'])

export interface RootState {
    user: UserState,
    token: TokenState,
    drop: DropState
}

const store = createStore<RootState, any, any, any>(
  combineReducers({
    user: userReducer,
    token: tokenReducer,
    drop: dropReducer
  }),
  // getLocalStore()
)

// function init () {
//   setLocalStore(store)
// }
// store.subscribe(init)
// init()

export default store;