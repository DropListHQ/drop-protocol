import { ActionType } from 'typesafe-actions';
import * as actions from './actions'

export type TCommunities = {
  id: string,
  name: string | null,
  numOwners: string | null,
  numTokens:string | null
}[]

export interface CommunitiesState {
  loading: boolean,
  communities: TCommunities
}

export type CommunitiesActions = ActionType<typeof actions>;