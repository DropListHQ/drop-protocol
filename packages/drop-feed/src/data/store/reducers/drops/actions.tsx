import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TRetroDrop } from 'types'


export function addNewRetroDrop(retroDrop: TRetroDrop) {
  return action(Constants.DROP_ADD_NEW_RETRO_DROP, retroDrop)
}