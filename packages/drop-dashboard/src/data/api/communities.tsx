import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.studio.thegraph.com/query/9597/dropowners1/0.0.22'
});

type TOwners = {
  data: {
    nfts: {
      nftOwners: {
        owner: string
      }[],
      tokenID: string
    }[]
  },
  errors?: any
}


const getCommunityData = async (contract: string[]) => {
  const response = await instance.post('/', {
    query: `query NftOwners($contract: [String]) {
      nftContracts (
        where: { id_in: $contract },
        first: 5
      ) {
        id
        name
        numTokens
        numOwners
        nftOwners (first: 999) {
          owner
          contract {
            name
          }
        }
        symbol
        type
      }
    }`,
    variables: { contract }
  })
  return response.data
}

const getOwners = async (contract: string): Promise<TOwners> => {
  const response = await instance.post('/', {
    query: `query NftOwners($contract: String) {
      nfts(
        where:{ contract:$contract }
      ){
        tokenID
        nftOwners {
          owner
        }
      }
    }`,
    variables: { contract }
  })
  return response.data
}

const communities = {
  getCommunityData,
  getOwners
}

export default communities
