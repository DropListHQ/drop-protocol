import { checkRecipientsDataFormat } from './index'
import {
  TCampaignTokenType,
  TItemERC1155,
  TItemERC721,
  TItemERC20
} from 'types'
import { utils } from 'ethers';

type TResult<TItemType> = (type: TCampaignTokenType, data: string) => TItemType | null
type TResultERC20 = (type: TCampaignTokenType, data: string, decimals: number) => TItemERC20 | null


export const parseDataERC1155: TResult<TItemERC1155> = (type, data) => {
  if (!data || !type) {
    return null
  }
  const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  if (!recipientsFormatValid) {
    return null
  }
  const recipients = data.split('\n')

  const recipientsData = recipients.reduce<TItemERC1155>((memo, item: string) => {
    const itemSplit = item.split(',').map((item: string) => item.trim())
    return {
      ...memo,
      [itemSplit[0]]: {
        tokenId: itemSplit[1],
        amount: itemSplit[2]
      }
    }
  }, {})

  return recipientsData
}


export const parseDataERC721: TResult<TItemERC721> = (type, data) => {
  if (!data || !type) {
    return null
  }
  const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  if (!recipientsFormatValid) {
    return null
  }
  const recipients = data.split('\n')

  const recipientsData = recipients.reduce<TItemERC721>((memo, item: string) => {
    const itemSplit = item.split(',').map((item: string) => item.trim())
    return {
      ...memo,
      [itemSplit[0]]: {
        tokenId: itemSplit[1],
      }
    }
  }, {})

  return recipientsData
}

export const parseDataERC20: TResultERC20 = (type, data, decimals) => {
  console.log({ data })
  if (!data || !type) {
    return null
  }
  const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  if (!recipientsFormatValid) {
    return null
  }
  const recipients = data.split('\n')
  console.log({ recipients })

  const recipientsData = recipients.reduce<TItemERC20>((memo, item: string) => {
    const itemSplit = item.split(',').map((item: string) => item.trim())
    const amount = String(utils.parseUnits(String(itemSplit[1]), decimals))
    return {
      ...memo,
      [itemSplit[0]]: {
        amount,
      }
    }
  }, {})

  return recipientsData
}




