import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TRecipientsData, TDropType } from '@drop-protocol/drop-sdk';

export interface CampaignState {
  loading: boolean,
  chainId: number | null,
  tokenAddress: string | null,
  tokenId: string | null,
  amount: string | null,
  allowedAddressList: string[],
  title: string,
  proof: string[],
  index: number,
  hash: null | string,
  claims: TRecipientsData,
  logoURL: string | null,
  type: TDropType | null,
  winner: string | null
}

export type CampaignActions = ActionType<typeof actions>;
