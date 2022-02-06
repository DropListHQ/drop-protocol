import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TRetroDrop } from 'types'

export interface DropsState {
  retroDrops: TRetroDrop[]
}

export type DropsActions = ActionType<typeof actions>;