interface MerkleDistributorInfoERC20 {
  merkleRoot: string
  tokenTotal: string
  creationTime: string | number
  claims: {
    [account: string]: {
      index: number
      amount: string
      proof: string[]
      flags?: {
        [flag: string]: boolean
      }
    }
  }
}

export default MerkleDistributorInfoERC20