
import { Dispatch } from 'redux';
import * as actionsDrop from '../actions';
import { DropActions } from '../types';
import { TokenActions } from '../../token/types';
import { ethers } from 'ethers'
import { DropInterfaceERC1155 } from '@drop-protocol/drop-sdk'

const checkReceipt = async function (contractInstance: any, currentIndex: number): Promise<string> {
  return new Promise((resolve, reject) => {
    contractInstance.on('ClaimedERC1155', (index: number, account: string, tokenId: string, amount: string, event: any) => { 
      if (currentIndex === Number(index)) {
        const { transactionHash } = event
        resolve(transactionHash)
      }
    })
  })
}

export default async function claim(
	dispatch: Dispatch<DropActions> & Dispatch<TokenActions>,
  provider: any,
	index: number,
  amount: string,
  address: string,
  tokenId: string,
  dropAddress: string,
  merkleProof: string[],
) {
  try {
    const contractInstanceProvider = new ethers.Contract(dropAddress, DropInterfaceERC1155, provider)
    dispatch(actionsDrop.setStep('claiming_process'))
    const hash = await claimTokens(provider, index, amount, address, tokenId, dropAddress, merkleProof)
    dispatch(actionsDrop.setHash(hash))
    const updatedHash = await checkReceipt(contractInstanceProvider, index)
    if (updatedHash) {
      dispatch(actionsDrop.setHash(updatedHash))
      dispatch(actionsDrop.setStep('claiming_finished'))
    }
  } catch (err) {
    console.log(err)
  }
}

const claimTokens = async (
  provider: any,
	index: number,
  amount: string,
  address: string,
  tokenId: string,
  dropAddress: string,
  merkleProof: string[],
) => {
  const signer = await provider.getSigner()
  const contractInstanceSigner = new ethers.Contract(dropAddress, DropInterfaceERC1155, signer)
  const result = await contractInstanceSigner.claim(index, address, tokenId, amount, merkleProof)
  const { hash } = result
  return hash
}