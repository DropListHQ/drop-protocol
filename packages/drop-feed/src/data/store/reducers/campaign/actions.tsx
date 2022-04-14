import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TDropType, TRecipientsData } from '@drop-protocol/drop-sdk';

export function setLoading(loading: boolean) {
  return action(Constants.CAMPAIGN_SET_LOADING, { loading })
}

export function setChainId(chainId: number) {
  return action(Constants.CAMPAIGN_SET_CHAIN_ID, { chainId })
}

export function setTokenAddress(tokenAddress: string) {
  return action(Constants.CAMPAIGN_SET_TOKEN_ADDRESS, { tokenAddress })
}

export function setAllowedAddressList(allowedAddressList: string[]) {
  return action(Constants.CAMPAIGN_SET_ALLOWED_ADDRESS_LIST, { allowedAddressList })
}

export function setAmount(amount: string) {
  return action(Constants.CAMPAIGN_SET_AMOUNT, { amount })
}

export function setTokenId(tokenId: string) {
  return action(Constants.CAMPAIGN_SET_TOKEN_ID, { tokenId })
}

export function setProof(proof: string[]) {
  return action(Constants.CAMPAIGN_SET_PROOF, { proof })
}

export function setIndex(index: number) {
  return action(Constants.CAMPAIGN_SET_INDEX, { index })
}

export function setHash(hash: string) {
  return action(Constants.CAMPAIGN_SET_HASH, { hash })
}

export function setClaims(claims: TRecipientsData) {
  return action(Constants.CAMPAIGN_SET_CLAIMS, { claims })
}

export function setType(type: TDropType) {
  return action(Constants.CAMPAIGN_SET_TYPE, { type })
}

export function setLogoURL(logoURL: string) {
  return action(Constants.CAMPAIGN_SET_LOGO_URL, { logoURL })
}

// new

export function setPrizeWinner(logoURL: string) {
  return action(Constants.CAMPAIGN_SET_LOGO_URL, { logoURL })
}

