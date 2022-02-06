
import { Dispatch } from 'redux';
import * as actionsDrop from '../actions';
import * as actionsToken from '../../token/actions';
import { DropActions } from '../types';
import { TokenActions } from '../../token/types';
import { getIPFSData } from 'data/api'
import { ethers } from 'ethers'
import { DropInterfaceERC1155, DropFactoryInterface } from '@drop-protocol/drop-sdk'
import contracts from 'configs/contracts'
import { hexlifyIpfsHash, getValidImage } from 'helpers'
import { TDropType, TRecipientsData } from 'types'
import { utils } from 'ethers'
import getERC1155Data from './get-erc1155-token-data'
import getERC721Data from './get-erc721-token-data'
import getERC20Data from './get-erc20-token-data'

type TResponse = {
  chainId: number;
  tokenAddress: string;
  claims: TRecipientsData,
  title: string,
  logoURL: string,
  description: string,
  type: TDropType
}


export default async function getData(
	dispatch: Dispatch<DropActions> & Dispatch<TokenActions>,
  provider: any,
	ipfs: string,
  userChainId: number,
  userAddress: string
) {
  dispatch(actionsDrop.setLoading(true))
  const { data }: { data: TResponse } = await getIPFSData.get(ipfs)
  const { chainId, tokenAddress, claims, title, logoURL, description, type } = data
  const contractData = contracts[chainId]

	const factoryAddress = contractData.factory
	const templateAddress = contractData[type]

  const allowedAddressList = Object.keys(claims)

  dispatch(actionsDrop.setChainId(chainId))
  dispatch(actionsDrop.setTokenAddress(tokenAddress))
  dispatch(actionsDrop.setAllowedAddressList(allowedAddressList))
  

  if (chainId !== userChainId) {
    dispatch(actionsDrop.setLoading(false))
    return dispatch(actionsDrop.setStep('change_network'))
  }

  // if (!allowedAddressList.includes(userAddress)) {
  //   dispatch(actionsDrop.setLoading(false))
  //   return dispatch(actionsDrop.setStep('not_allowed'))
  // }

  let dropAddress: string = '' 

  if (factoryAddress) {
    const factoryContractInstance = new ethers.Contract(factoryAddress, DropFactoryInterface, provider)
    dropAddress = await factoryContractInstance.getDrop(hexlifyIpfsHash(ipfs))
    dispatch(actionsDrop.setDropAddress(dropAddress))
  }

  dispatch(actionsDrop.setTitle(title))
  dispatch(actionsDrop.setDescription(description))
  dispatch(actionsDrop.setClaims(claims))
  const validLogoURL = await getValidImage(logoURL)
  dispatch(actionsDrop.setLogoURL(validLogoURL))
  dispatch(actionsDrop.setType(type))

  if (claims[userAddress]) {
    const { amount, tokenId, proof, index } = claims[userAddress]

    console.log({ amount, tokenId, proof, index })

    if (tokenId && amount && type === 'erc1155') {
      const { name, image, description } = await getERC1155Data(provider, tokenAddress, tokenId)
      dispatch(actionsDrop.setAmount(amount))
      dispatch(actionsDrop.setTokenId(tokenId))
      dispatch(actionsToken.setDescription(description))
      dispatch(actionsToken.setImage(image))
      dispatch(actionsToken.setName(name))
    }

    if (tokenId && !amount && type === 'erc721') {
      const { name, image, description } = await getERC721Data(provider, tokenAddress, tokenId)
      dispatch(actionsDrop.setTokenId(tokenId))
      dispatch(actionsToken.setDescription(description))
      dispatch(actionsToken.setImage(image))
      dispatch(actionsToken.setName(name))
    }

    if (amount && !tokenId && type === 'erc20') {
      const { symbol, decimals, image } = await getERC20Data(provider, tokenAddress, userChainId)
      dispatch(actionsToken.setName(symbol))
      dispatch(actionsToken.setImage(image))
      dispatch(actionsToken.setDecimals(decimals))
      dispatch(actionsDrop.setAmount(amount))
      dispatch(actionsToken.setDescription(description))
    }
    
    dispatch(actionsDrop.setProof(proof))
    dispatch(actionsDrop.setIndex(index))
    if (dropAddress) {
      console.log({ dropAddress, index })
      const dropContractInstance = new ethers.Contract(dropAddress, DropInterfaceERC1155, provider)
      
      const isClaimed = await dropContractInstance.isClaimed(index)
      if (isClaimed) {
        dispatch(actionsDrop.setLoading(false))
        return dispatch(actionsDrop.setStep('claiming_finished'))
      }
    }
  }

  dispatch(actionsDrop.setLoading(false))
  dispatch(actionsDrop.setStep('initial'))
}
