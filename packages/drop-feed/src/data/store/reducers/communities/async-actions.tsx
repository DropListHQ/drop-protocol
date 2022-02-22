import { Dispatch } from 'redux';
import * as actionsCommunities from './actions';
import { CommunitiesActions } from './types';
import { communities } from 'data/api'
import communitiesData from 'configs/communities'
import { getCSV } from 'helpers'
type TReduce = { owner: string, tokenID: string }[]

export async function getCommunityData(
  dispatch: Dispatch<CommunitiesActions>,
  contracts: string[]
) {
  // const res = await communities.getCommunityData(contracts)
  // const { data, errors } = res
  // console.log({ data })
  // if (errors) { return }
  // const { nftContracts } = data

  const nftContracts = contracts.map(contract => {
    return { ...communitiesData[contract], id: contract }
  })
  console.log({ nftContracts })

  dispatch(actionsCommunities.setCommunities(nftContracts))
}


export async function getOwnersData(
  dispatch: Dispatch<CommunitiesActions>,
  contract: string
) {
  const res = await communities.getOwners(contract)
  const { data, errors } = res
  if (errors) { return }
  const { nfts } = data

  const result = nfts.reduce<TReduce>((result, nft) => {
    nft.nftOwners.forEach(owner => {
      result.push({ owner: owner.owner, tokenID: nft.tokenID })
    })
    return result
  }, [])

  getCSV('owners.csv', result)
}
