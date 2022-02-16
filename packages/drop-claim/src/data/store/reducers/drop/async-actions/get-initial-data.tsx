import { Dispatch } from 'redux';
import * as actionsDrop from '../actions';
import * as actionsToken from '../../token/actions';
import { DropActions } from '../types';
import { TokenActions } from '../../token/types';
import { ethers } from 'ethers'
import { getValidImage } from 'helpers'
import { utils } from 'ethers'
import getERC1155Data from './get-erc1155-token-data'
import getERC721Data from './get-erc721-token-data'
import getERC20Data from './get-erc20-token-data'
import DropSDK, { Drop } from '@drop-protocol/drop-sdk'

const { REACT_APP_IPFS_URL } = process.env

export default async function getData(
  dispatch: Dispatch<DropActions> & Dispatch<TokenActions>,
  provider: any,
  ipfshash: string,
  userChainId: number,
  userAddress: string
) {
  dispatch(actionsDrop.setLoading(true))
  const dropSDK = new DropSDK(provider, userChainId, REACT_APP_IPFS_URL)
  const drop: Drop = await dropSDK.getDrop(ipfshash)

  const allowedAddressList = drop.getRecipients()
  dispatch(actionsDrop.setChainId(drop.chainId))
  dispatch(actionsDrop.setTokenAddress(drop.tokenAddress))
  dispatch(actionsDrop.setAllowedAddressList(allowedAddressList))


  if (drop.chainId !== userChainId) {
    dispatch(actionsDrop.setLoading(false))
    return dispatch(actionsDrop.setStep('change_network'))
  }

  // if (!allowedAddressList.includes(userAddress)) {
  //   dispatch(actionsDrop.setLoading(false))
  //   return dispatch(actionsDrop.setStep('not_allowed'))
  // }

  dispatch(actionsDrop.setDropAddress(drop.address))
  dispatch(actionsDrop.setTitle(drop.metadata.title))
  dispatch(actionsDrop.setDescription(drop.metadata.description))
  dispatch(actionsDrop.setClaims(drop.claims))
  const validLogoURL = await getValidImage(drop.metadata.logoURL)
  dispatch(actionsDrop.setLogoURL(validLogoURL))
  dispatch(actionsDrop.setType(drop.type))

  if (drop.claims[userAddress]) {
    const { amount, tokenId, proof, index } = drop.claims[userAddress]

    console.log({ amount, tokenId, proof, index })

    if (tokenId && amount && drop.type === 'erc1155') {
      const { name, image, description } = await getERC1155Data(provider, drop.tokenAddress, tokenId)
      dispatch(actionsDrop.setAmount(amount))
      dispatch(actionsDrop.setTokenId(tokenId))
      dispatch(actionsToken.setDescription(description))
      dispatch(actionsToken.setImage(image))
      dispatch(actionsToken.setName(name))
    }

    if (tokenId && !amount && drop.type === 'erc721') {
      const { name, image, description } = await getERC721Data(provider, drop.tokenAddress, tokenId)
      dispatch(actionsDrop.setTokenId(tokenId))
      dispatch(actionsToken.setDescription(description))
      dispatch(actionsToken.setImage(image))
      dispatch(actionsToken.setName(name))
    }

    if (amount && !tokenId && drop.type === 'erc20') {
      const { symbol, decimals, image } = await getERC20Data(provider, drop.tokenAddress, userChainId)
      dispatch(actionsToken.setName(symbol))
      dispatch(actionsToken.setImage(image))
      dispatch(actionsToken.setDecimals(decimals))
      dispatch(actionsDrop.setAmount(amount))
      dispatch(actionsToken.setDescription(drop.metadata.description))
    }

    dispatch(actionsDrop.setProof(proof))
    dispatch(actionsDrop.setIndex(index))
    if (drop.address) {
      const isClaimed = await drop.hasReceiverClaimed(userAddress)
      if (isClaimed) {
        dispatch(actionsDrop.setLoading(false))
        return dispatch(actionsDrop.setStep('claiming_finished'))
      }
    }
  }

  dispatch(actionsDrop.setLoading(false))
  dispatch(actionsDrop.setStep('initial'))
}
