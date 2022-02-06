const parseData = (data: string): {
  [recipient: string]: {
    tokenId: string | number,
    amount: number
  }
} | null => {

  if (!data) {
    return null
  }

  const recipients = data.split('\n')
  const recipientsFormatValid = recipients.every(item => {
    const itemDivided = item.split(',').map((item: string) => item.trim())
    return itemDivided[0].length === 42 && itemDivided.length === 3
  })

  if (!recipientsFormatValid) {
    return null
  }

  const recipientsData = recipients.reduce<{
    [recipient: string]: {
      tokenId: string | number,
      amount: number
    }
  }>((memo, item: string) => {
    const itemSplit = item.split(',').map((item: string) => item.trim())
    return {
      ...memo,
      [itemSplit[0]]: {
        tokenId: itemSplit[1],
        amount: Number(itemSplit[2])
      }
    }
  }, {})
  return recipientsData
}

export default parseData

// const testData = {
//   "0xF3c6F5F265F503f53EAD8aae90FC257A5aa49AC1": { amount: 1, tokenId: 1 },
//   "0xB9CcDD7Bedb7157798e10Ff06C7F10e0F37C6BdD": { amount: 2, tokenId: 2 },
//   "0xf94DbB18cc2a7852C9CEd052393d517408E8C20C": { amount: 3, tokenId: 3 },
//   "0xf0591a60b8dBa2420408Acc5eDFA4f8A15d87308": { amount: 4, tokenId: 4 },
// }

