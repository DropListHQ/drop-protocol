type TMerkleTree = {
  merkleRoot: string,
  tokenTotal: string,
  creationTime: string | number,
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
  logoURL: string
}

export default TMerkleTree