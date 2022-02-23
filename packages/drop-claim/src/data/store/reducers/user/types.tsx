import DropSDK from '@drop-protocol/drop-sdk'
import { ActionType } from 'typesafe-actions';
import * as actions from './actions'

export interface UserState {
  address: string
  loading: boolean,
  provider: any,
  chainId: number | null,
  dropSDK: DropSDK | undefined
}

export type UserActions = ActionType<typeof actions>;
