import { action } from 'typesafe-actions';
import { Constants } from './constants';

export function setName(name: string) {
  return action(Constants.TOKEN_SET_NAME, {
    name
  })
}

export function setDescription(description: string) {
  return action(Constants.TOKEN_SET_DESCRIPTION, {
    description
  })
}

export function setImage(image: string) {
  return action(Constants.TOKEN_SET_IMAGE, {
    image
  })
}

export function setDecimals(decimals: number) {
  return action(Constants.TOKEN_SET_DECIMALS, {
    decimals
  })
}
