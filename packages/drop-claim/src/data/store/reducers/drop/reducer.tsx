import { DropState, DropActions } from './types';
import { Constants } from './constants';
console.log({ Constants })
const initialState: DropState = {
  step: 'loading',
  loading: false,
  chainId: null,
  tokenAddress: null,
  tokenId: null,
  amount: null,
  allowedAddressList: [],
  title: '',
  dropAddress: '',
  proof: [],
  index: 0,
  hash: null,
  claims: {},
  logoURL: null,
  description: null,
  type: null
}

export function dropReducer(
  state: DropState = initialState,
  action: DropActions
): DropState {
    switch (action.type) {
        case Constants.DROP_SET_STEP:
          return {...state, step: action.payload.step }
        case Constants.DROP_SET_CHAIN_ID:
          return {...state, chainId: action.payload.chainId }
        case Constants.DROP_SET_TOKEN_ADDRESS:
          return {...state, tokenAddress: action.payload.tokenAddress }
        case Constants.DROP_SET_ALLOWED_ADDRESS_LIST:
          return {...state, allowedAddressList: action.payload.allowedAddressList }
        case Constants.DROP_SET_AMOUNT:
            return {...state, amount: action.payload.amount }
        case Constants.DROP_SET_TITLE:
            return {...state, title: action.payload.title }
        case Constants.DROP_SET_DROP_ADDRESS:
          return {...state, dropAddress: action.payload.dropAddress }
        case Constants.DROP_SET_PROOF:
          return {...state, proof: action.payload.proof }
        case Constants.DROP_SET_TOKEN_ID:
          return {...state, tokenId: action.payload.tokenId }
        case Constants.DROP_SET_INDEX:
          return {...state, index: action.payload.index }
        case Constants.DROP_SET_HASH:
          return {...state, hash: action.payload.hash }
        case Constants.DROP_SET_LOGO_URL:
          return {...state, logoURL: action.payload.logoURL }
        case Constants.DROP_SET_DESCRIPTION:
          return {...state, description: action.payload.description }
        case Constants.DROP_SET_TYPE:
          return {...state, type: action.payload.type }
        default:
            return state;
    }
}