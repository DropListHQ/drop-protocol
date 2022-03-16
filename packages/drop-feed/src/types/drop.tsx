import { TDropStatus, TRecipientsData, TDropType } from './index.js'

type TDrop = {
  title: string,
  ipfsHash: string,
  address: string,
  chainId: number,
  description: string,
  logoURL: string,
  status: TDropStatus,
  tokenAddress: string,
  recipients: TRecipientsData,
  type: TDropType,
  decimals: number | null,
  dropAddress: string
}

export default TDrop