import { ActionType } from 'typesafe-actions';
import * as actions from './actions'

export interface UserState {
  address: string
  loading: boolean,
  provider: any,
  chainId: number | null
}

export type UserActions = ActionType<typeof actions>;