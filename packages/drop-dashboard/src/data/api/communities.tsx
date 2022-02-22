import axios from 'axios'
import communitiesConfig from 'configs/communities'

const instance = axios.create({
  baseURL: 'https://api.studio.thegraph.com/query/9597/dropowners32/0.0.2'
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
        where: { id_in: $contract }
      ) {
        id
        name
        numTokens
        numOwners
        nftOwners {
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
  const instance = axios.create({
    baseURL: communitiesConfig[contract].url
  });
  const response = await instance.post('/', {
    query: `query NftOwners($contract: String) {
      nfts(
        where:{ contract:$contract },
        orderBy: tokenID,
        orderDirection: asc,
        first: 1000
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
