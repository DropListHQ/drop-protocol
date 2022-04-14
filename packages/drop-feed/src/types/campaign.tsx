import { TCampaignOwner, TCommunities, TTicket, TPrize } from './index'

export interface ICampaign {
  title: string,
  owner: TCampaignOwner,
  short_description: string,
  image: string,
  campaign_address: string,
  chain_id: number,
  communities: TCommunities,
  status: 'active' | 'finished',
  prize: TPrize
}

export interface ICampaignDetails extends ICampaign {
  date: string,
  description: string,
  ticket: TTicket
}

