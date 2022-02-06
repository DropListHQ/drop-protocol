import { TRetroDropStatus, TRecipientsData, TRetroDropType } from './index.js'

type TRetroDrop = {
  title: string,
  ipfsHash: string,
  address: string,
  chainId: number,
  description: string,
  logoURL: string,
  status: TRetroDropStatus,
  tokenAddress: string,
  recipients: TRecipientsData,
  type: TRetroDropType,
  decimals: number | null
}

export default TRetroDrop