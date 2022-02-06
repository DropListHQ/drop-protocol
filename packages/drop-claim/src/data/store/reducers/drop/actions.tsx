import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TDropStep, TDropType, TRecipientsData } from 'types'

export function setStep(step: TDropStep) {
  return action(Constants.DROP_SET_STEP, { step })
}

export function setLoading(loading: boolean) {
  return action(Constants.DROP_SET_LOADING, { loading })
}

export function setChainId(chainId: number) {
  return action(Constants.DROP_SET_CHAIN_ID, { chainId })
}

export function setTokenAddress(tokenAddress: string) {
  return action(Constants.DROP_SET_TOKEN_ADDRESS, { tokenAddress })
}

export function setAllowedAddressList(allowedAddressList: string[]) {
  return action(Constants.DROP_SET_ALLOWED_ADDRESS_LIST, { allowedAddressList })
}

export function setAmount (amount: string) {
  return action(Constants.DROP_SET_AMOUNT, { amount })
}

export function setDescription (description: string) {
  return action(Constants.DROP_SET_DESCRIPTION, { description })
}

export function setTitle (title: string) {
  return action(Constants.DROP_SET_TITLE, { title })
}

export function setTokenId (tokenId: string) {
  return action(Constants.DROP_SET_TOKEN_ID, { tokenId })
}

export function setDropAddress (dropAddress: string) {
  return action(Constants.DROP_SET_DROP_ADDRESS, { dropAddress })
}

export function setProof (proof: string[]) {
  return action(Constants.DROP_SET_PROOF, { proof })
}

export function setIndex (index: number) {
  return action(Constants.DROP_SET_INDEX, { index })
}

export function setHash (hash: string) {
  return action(Constants.DROP_SET_HASH, { hash })
}

export function setClaims (claims: TRecipientsData) {
  return action(Constants.DROP_SET_CLAIMS, { claims })
}

export function setType (type: TDropType) {
  return action(Constants.DROP_SET_TYPE, { type })
}

export function setLogoURL (logoURL: string) {
  return action(Constants.DROP_SET_LOGO_URL, { logoURL })
}

