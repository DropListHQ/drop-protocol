import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { ICampaign } from 'types'

export function addCampaigns(campaign: ICampaign) {
  return action(Constants.ADD_CAMPAIGNS, campaign)
}