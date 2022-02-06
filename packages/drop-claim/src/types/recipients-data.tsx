

type TRecipientsData = {
  [recipient: string]: {
    tokenId?: string,
    amount?: string,
    index: number,
    proof: string[]
  }
}

export default TRecipientsData