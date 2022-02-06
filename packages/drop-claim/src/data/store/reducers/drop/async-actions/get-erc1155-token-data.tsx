import { ERC1155Contract } from 'abi'
import { getERC1155TokenData } from 'data/api'
import { ethers } from 'ethers'
import { IPFSRedefineUrl } from 'helpers'
import { getValidImage } from 'helpers'
import nftPlaceholder from 'images/nft-placeholder.png'

type TTokenERC1155Data = { name: string, image: string, description: string }
type TGetTokenERC1155Data = (provider: any, tokenAddress: string, tokenId: string) => Promise<TTokenERC1155Data>


const getTokenData: TGetTokenERC1155Data = async (provider, tokenAddress, tokenId ) => {
  try {
    const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract, provider)
    let actualUrl = await contractInstance.uri(tokenId)
    actualUrl = IPFSRedefineUrl(actualUrl)
    const tokenData = await getERC1155TokenData(actualUrl, tokenId)
    const image = await getValidImage(tokenData.data.image)
    return {
      ...tokenData.data,
      image
    }
  } catch (e) {
    return { name: 'ERC1155', image: nftPlaceholder, description: '' }
  }
}



export default getTokenData