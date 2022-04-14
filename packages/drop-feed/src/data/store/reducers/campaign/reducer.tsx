import { CampaignState, CampaignActions } from './types';
import { Constants } from './constants';

const initialState: CampaignState = {
  loading: false,
  chainId: null,
  tokenAddress: null,
  tokenId: null,
  amount: null,
  allowedAddressList: [],
  title: '',
  proof: [],
  index: 0,
  hash: null,
  claims: {},
  logoURL: null,
  type: null,
  winner: null
}

export function campaignReducer(
  state: CampaignState = initialState,
  action: CampaignActions
): CampaignState {
  switch (action.type) {
    case Constants.CAMPAIGN_SET_CHAIN_ID:
      return { ...state, chainId: action.payload.chainId }
    case Constants.CAMPAIGN_SET_TOKEN_ADDRESS:
      return { ...state, tokenAddress: action.payload.tokenAddress }
    case Constants.CAMPAIGN_SET_ALLOWED_ADDRESS_LIST:
      return { ...state, allowedAddressList: action.payload.allowedAddressList }
    case Constants.CAMPAIGN_SET_AMOUNT:
      return { ...state, amount: action.payload.amount }
    case Constants.CAMPAIGN_SET_PROOF:
      return { ...state, proof: action.payload.proof }
    case Constants.CAMPAIGN_SET_TOKEN_ID:
      return { ...state, tokenId: action.payload.tokenId }
    case Constants.CAMPAIGN_SET_INDEX:
      return { ...state, index: action.payload.index }
    case Constants.CAMPAIGN_SET_HASH:
      return { ...state, hash: action.payload.hash }
    case Constants.CAMPAIGN_SET_LOGO_URL:
      return { ...state, logoURL: action.payload.logoURL }
    case Constants.CAMPAIGN_SET_TYPE:
      return { ...state, type: action.payload.type }
    default:
      return state;
  }
}
