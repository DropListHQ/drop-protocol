import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import DropSDK from '@drop-protocol/drop-sdk'

export interface UserState {
  address: string
  loading: boolean,
  provider: any,
  chainId: number | null,
  dropSDK: DropSDK | undefined,
  showConnectorPopup: boolean
}

export type UserActions = ActionType<typeof actions>;