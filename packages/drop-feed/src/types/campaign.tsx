import { TCampaignOwner, TCampaignTokenType, TCommunities } from './index'

export interface ICampaign {
  title: string,
  owner: TCampaignOwner,
  short_description: string,
  image: string,
  campaign_address: string,
  chain_id: number,
  token_type: TCampaignTokenType,
  communities: TCommunities,
  token_address: string,
  token_id?: string | number,
  status: 'active' | 'finished'
}

export interface ICampaignDetails extends ICampaign {
  date: string,
  description: string,
  ticket: {
    total: number,
    token_address: string,
    type: TCampaignTokenType
  }
}

