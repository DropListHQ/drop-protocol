import DropSDK from '@drop-protocol/drop-sdk'
import { UserState, UserActions } from './types';
import { Constants } from './constants';

const { REACT_APP_IPFS_URL } = process.env

const initialState: UserState = {
  address: '',
  loading: false,
  provider: undefined,
  chainId: null,
  dropSDK: undefined
};

export function userReducer(
  state: UserState = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case Constants.USER_SET_ADDRESS:
      return { ...state, address: action.payload.address }
    case Constants.USER_SET_LOADING:
      return { ...state, loading: action.payload.loading }
    case Constants.USER_SET_PROVIDER:
      return { ...state, provider: action.payload.provider }
    case Constants.USER_SET_CHAIN_ID:
      return { ...state, chainId: action.payload.chainId }
    case Constants.USER_SET_DROP_SDK:
      const { provider, chainId } = action.payload
      const dropSDK = new DropSDK(provider, chainId, REACT_APP_IPFS_URL)
      return { ...state, dropSDK }
    default:
      return state;
  }
}
