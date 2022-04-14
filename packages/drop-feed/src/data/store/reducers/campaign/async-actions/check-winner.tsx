
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';

export default async function claim(
	dispatch: Dispatch<CampaignActions>,
  provider: any,
  campaignAddress: string,
) {
  try {
    dispatch(actionsCampaign.setLoading(true))
    dispatch(actionsCampaign.setPrizeWinner('0x70dFbD1149250EDDeAE6ED2381993B517A1c9cE8'))
    dispatch(actionsCampaign.setLoading(false))
  } catch (err) {
    console.log(err)
  }
}
