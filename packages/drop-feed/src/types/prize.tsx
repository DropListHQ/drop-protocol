import { TCampaignTokenType } from './index'

type TPrize = {
  token_id?: number,
  token_address: string,
  token_type: TCampaignTokenType,
  collection_name: string
}

export default TPrize