import { TDropStatus, TRecipientsData, TCampaignTokenType } from './index.js'

type TCampaign = {
  title: string,
  ipfsHash: string,
  address: string,
  chainId: number,
  description: string,
  logoURL: string,
  status: TDropStatus,
  tokenAddress: string,
  recipients: TRecipientsData,
  type: TCampaignTokenType,
  decimals: number | null,
  dropAddress: string
}

export default TCampaign