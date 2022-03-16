import { TDropType, TRecipientsData } from 'types'
import { utils } from 'ethers'
type TCountTotalTokens = (recipientsData: TRecipientsData, type: TDropType | null, decimals: number | null) => number

const countTotalTokens: TCountTotalTokens = (recipientsData, type, decimals) => {
  if (!recipientsData) { return 0 }
  if (type === 'erc1155') {
    return Object.values(recipientsData).reduce((sum, item) => sum + Number(item.amount), 0)
  }
  if (type === 'erc20') {
    return Object.values(recipientsData).reduce((sum, item) => {
      if (!decimals) {
        return sum + Number(item.amount)
      } else {
        return sum + Number(utils.formatUnits(item.amount, decimals))
      }
      
    }, 0)
  }
  return Object.values(recipientsData).length
}

export default countTotalTokens