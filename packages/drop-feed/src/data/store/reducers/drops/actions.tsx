import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TDrop } from 'types'


export function addNewRetroDrop(drop: TDrop) {
  return action(Constants.DROP_ADD_NEW_RETRO_DROP, drop)
}