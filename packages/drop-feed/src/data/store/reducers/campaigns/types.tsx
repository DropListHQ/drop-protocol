import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { ICampaign } from 'types'

export interface CampaignsState {
  campaigns: ICampaign[]
}

export type CampaignsActions = ActionType<typeof actions>;