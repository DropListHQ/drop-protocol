type TMerkleTree = {
  merkleRoot: string,
  tokenTotal: string,
  claims: {
    [recepientAddress: string]: {
      index: number,
      amount: string,
      tokenId: string | number,
      proof: string[]
    }
  },
  title: string,
  description: string,
  logoURL: string,
  creationTime: string | number
}

export default TMerkleTree