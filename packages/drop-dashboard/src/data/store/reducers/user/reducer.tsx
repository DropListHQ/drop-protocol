import { UserState, UserActions } from './types';
import { Constants } from './constants';

const initialState: UserState = {
  address: '',
  loading: false,
  provider: null,
  chainId: null
};

export function userReducer(
  state: UserState = initialState,
  action: UserActions
): UserState {
    switch (action.type) {
        case Constants.USER_SET_ADDRESS:
          return { ...state, address: action.payload.address }
        case Constants.USER_SET_LOADING:
          return {...state, loading: action.payload.loading }
        case Constants.USER_SET_PROVIDER:
          return {...state, provider: action.payload.provider }
        case Constants.USER_SET_CHAIN_ID:
          return {...state, chainId: action.payload.chainId }
        default:
            return state;
    }
}