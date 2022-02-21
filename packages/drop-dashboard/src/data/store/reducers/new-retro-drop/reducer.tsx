import { NewRetroDropState, NewRetroDropActions } from './types';
import { Constants } from './constants';

const initialState: NewRetroDropState = {
  title: '',
  merkleTree: null,
  stepsCompleted: [],
  tokenAddress: '',
  logoURL: '',
  description: '',
  dropAddress: null,
  loading: false,
  ipfs: null,
  type: null,
  decimals: null,
  recipientsValue: ''
}

export function newRetroDropReducer(
  state: NewRetroDropState = initialState,
  action: NewRetroDropActions
): NewRetroDropState {
    switch (action.type) {
        case Constants.DROP_SET_MERKLE_TREE:
          return {...state, merkleTree: action.payload.merkleTree }
        case Constants.DROP_COMPLETE_STEP:
          const stepsCompleted = [ ...state.stepsCompleted, action.payload.step ]
          return {...state, stepsCompleted  }
        case Constants.DROP_SET_TOKEN_ADDRESS:
          return {...state, tokenAddress: action.payload.tokenAddress }
        case Constants.DROP_SET_TITLE:
          return {...state, title: action.payload.title }
        case Constants.DROP_SET_DESCRIPTION:
          return {...state, description: action.payload.description }
        case Constants.DROP_SET_LOGO_URL:
          return {...state, logoURL: action.payload.logoURL }
        case Constants.DROP_SET_LOADING:
          return {...state, loading: action.payload.loading }
        case Constants.DROP_SET_IPFS:
          return {...state, ipfs: action.payload.ipfs }
        case Constants.DROP_SET_DROP_ADDRESS:
          return {...state, dropAddress: action.payload.dropAddress }
        case Constants.DROP_SET_TYPE:
          return {...state, type: action.payload.type }
        case Constants.DROP_SET_DECIMALS:
          return {...state, decimals: action.payload.decimals }
        case Constants.DROP_SET_RECIPIENTS_VALUE:
          return {...state, recipientsValue: action.payload.recipientsValue }
        case Constants.DROP_CLEAR_NEW_RETRODROP:
          return initialState
        
        default:
          return state;
    }
}