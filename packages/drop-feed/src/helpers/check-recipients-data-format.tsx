import {
  TDropType, 
} from 'types'

const checkRecipientsDataFormat = (type: TDropType, data: string): boolean => {
  const recipients = data.split('\n')
  let isValid = false
  if (type === 'erc1155') {
    isValid = recipients.every(item => {
      const itemDivided = item.split(',').map((item: string) => item.trim())
      return itemDivided[0].length === 42 && itemDivided.length === 3
    })

  }

  if (type === 'erc721' || type === 'erc20') {
    isValid = recipients.every(item => {
      const itemDivided = item.split(',').map((item: string) => item.trim())
      return itemDivided[0].length === 42 && itemDivided.length === 2
    })

  }

  return isValid
}

export default checkRecipientsDataFormat



// 0x70dFbD1149250EDDeAE6ED2381993B517A1c9cE8, 4, 1