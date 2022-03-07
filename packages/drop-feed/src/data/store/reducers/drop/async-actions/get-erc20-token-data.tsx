import { ERC20Contract } from 'abi'
import { ethers } from 'ethers'
import tokenSymbol from 'images/token-placeholder.png'
type TTokenERC20Data = { symbol: string, decimals: number, description: string, image: string }
type TGetTokenERC20Data = (provider: any, tokenAddress: string, chainId: number) => Promise<TTokenERC20Data>

const getTokenData: TGetTokenERC20Data = async (provider, tokenAddress, chainId) => {
  try {
    const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract, provider)
    let symbol = await contractInstance.symbol()
    let decimals = await contractInstance.decimals()
    const image = await getImage(tokenAddress, chainId)
    return {
      symbol,
      decimals,
      description: '',
      image
    }
  } catch (e) {
    return { symbol: 'ERC20', decimals: 18, description: '', image: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png` }
  }
}

const getImage = async (tokenAddress: string, chainId: number) => {
  try {
    const imageUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`
    const checkImage = await fetch(imageUrl)
    if (checkImage.status === 404) { throw new Error() }
    return imageUrl
  } catch (err) {
    return tokenSymbol
  }
}

export default getTokenData