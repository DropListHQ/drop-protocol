interface MerkleDistributorInfoERC721 {
  merkleRoot: string
  creationTime: string | number
  claims: {
    [account: string]: {
      index: number
      proof: string[]
      flags?: {
        [flag: string]: boolean
      }
    }
  }
}

export default MerkleDistributorInfoERC721