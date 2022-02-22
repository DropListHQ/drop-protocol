import { action } from 'typesafe-actions';
import { Constants } from './constants';

export function setAddress(address: string) {
  return action(
    Constants.USER_SET_ADDRESS,
    // payload
    {
      address
    }
  )
}

export function setLoading(loading: boolean) {
  return action(
    Constants.USER_SET_LOADING,
    // payload
    {
      loading
    }
  )
}

export function setProvider(provider: any) {
  return action(
    Constants.USER_SET_PROVIDER,
    // payload
    {
      provider
    }
  )
}

export function setChainId(chainId: number) {
  return action(
    Constants.USER_SET_CHAIN_ID,
    // payload
    {
      chainId
    }
  )
}