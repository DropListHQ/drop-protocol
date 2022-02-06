import { ERC721Contract } from 'abi'
import { getERC721TokenData } from 'data/api'
import { ethers } from 'ethers'
import { IPFSRedefineUrl } from 'helpers'
import nftPlaceholder from 'images/nft-placeholder.png'
import { getValidImage } from 'helpers'

type TTokenERC721Data = { name: string, image: string, description: string }
type TGetTokenERC721Data = (provider: any, tokenAddress: string, tokenId: string) => Promise<TTokenERC721Data>


const getTokenData: TGetTokenERC721Data = async (provider, tokenAddress, tokenId ) => {
  try {
    const contractInstance = await new ethers.Contract(tokenAddress, ERC721Contract, provider)
    let actualUrl = await contractInstance.tokenURI(tokenId)
    actualUrl = IPFSRedefineUrl(actualUrl)
    const tokenData = await getERC721TokenData(actualUrl)
    const image = await getValidImage(tokenData.data.image)
    return {
      ...tokenData.data,
      image
    }
  } catch (e) {
    return { name: 'ERC721', image: nftPlaceholder, description: '' }
  }
}

export default getTokenData