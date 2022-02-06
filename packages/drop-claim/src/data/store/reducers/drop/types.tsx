import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TDropStep, TRecipientsData, TDropType } from 'types'

export interface DropState {
  step: TDropStep,
  loading: boolean,
  chainId: number | null,
  tokenAddress: string | null,
  tokenId: string | null,
  amount: string | null,
  allowedAddressList: string[],
  title: string,
  dropAddress: string,
  proof: string[],
  index: number,
  hash: null | string,
  claims: TRecipientsData,
  logoURL: string | null,
  description: string | null,
  type: TDropType | null
}



export type DropActions = ActionType<typeof actions>;