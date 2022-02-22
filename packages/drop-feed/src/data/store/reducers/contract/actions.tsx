import { action } from 'typesafe-actions';
import { Constants } from './constants';

export function setLoading(loading: boolean) {
  return action(Constants.CONTRACT_SET_LOADING, {
      loading
  })
}
