import { action } from 'typesafe-actions';
import { Constants } from './constants';

import { TCommunities } from './types'

export function setLoading(loading: boolean) {
  return action(Constants.COMMUNITIES_SET_LOADING, {
      loading
  })
}

export function setCommunities(communities: TCommunities) {
  return action(Constants.COMMUNITIES_SET_COMMUNITIES, {
    communities
  })
}