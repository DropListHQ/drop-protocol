import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TDrop } from 'types'

export interface DropsState {
  retroDrops: TDrop[]
}

export type DropsActions = ActionType<typeof actions>;