import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TRetroDropStep, TRetroDropType } from 'types'

export function setStep(step: TRetroDropStep) {
  return action(Constants.DROP_SET_STEP, {
    step
  })
}

export function setTokenAddress(tokenAddress: string) {
  return action(Constants.DROP_SET_TOKEN_ADDRESS, {
    tokenAddress
  })
}

export function setMerkleTree(merkleTree: any) {
  return action(Constants.DROP_SET_MERKLE_TREE, {
    merkleTree
  })
}

export function setTitle(title: string) {
  return action(Constants.DROP_SET_TITLE, {
    title
  })
}

export function setDescription(description: string) {
  return action(Constants.DROP_SET_DESCRIPTION, {
    description
  })
}

export function setLogoURL(logoURL: string) {
  return action(Constants.DROP_SET_LOGO_URL, {
    logoURL
  })
}

export function setLoading(loading: boolean) {
  return action(Constants.DROP_SET_LOADING, {
    loading
  })
}

export function setIPFS(ipfs: string) {
  return action(Constants.DROP_SET_IPFS, {
    ipfs
  })
}

export function setDropAddress(dropAddress: string) {
  return action(Constants.DROP_SET_DROP_ADDRESS, {
    dropAddress
  })
}

export function setType(type: TRetroDropType) {
  return action(Constants.DROP_SET_TYPE, {
    type
  })
}

export function setDecimals(decimals: number) {
  return action(Constants.DROP_SET_DECIMALS, {
    decimals
  })
}

export function clearNewRetroDrop() {
  return action(Constants.DROP_CLEAR_NEW_RETRODROP)
}
