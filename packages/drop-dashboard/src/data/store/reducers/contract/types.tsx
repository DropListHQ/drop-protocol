import { ActionType } from 'typesafe-actions';
import * as actions from './actions'

export interface ContractState {
  loading: boolean,
  ipfs: string | null
}

export type ContractActions = ActionType<typeof actions>;