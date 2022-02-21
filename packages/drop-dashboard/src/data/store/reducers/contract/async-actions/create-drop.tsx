import { Dispatch } from 'redux';
import * as actionsContract from '../actions';
import * as actionsNewRetroDrop from 'data/store/reducers/new-retro-drop/actions';
import { ContractActions } from '../types';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types';
import { ethers } from 'ethers';
import { TMerkleTree, TRetroDropType } from 'types'
import contracts from 'configs/contracts'
import { DropFactoryInterface } from '@drop-protocol/drop-sdk'
import { hexlifyIpfsHash } from 'helpers'

const DECEMBER_31_2325 = 11234234223 // Thursday, December 31, 2325 8:37:03 PM

export default async function createDrop(
	dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions>,
	provider: any,
	merkleTree: TMerkleTree,
	tokenAddress: string,
	ipfsHash: string,
	chainId: number,
	type: TRetroDropType,
	callback: () => void
) {
	dispatch(actionsContract.setLoading(true))
	try {
		const contractData = contracts[chainId]
		const factoryAddress = contractData.factory
		const templateAddress = contractData[type]
		let drop = await deployContract(provider, merkleTree, tokenAddress, ipfsHash, factoryAddress, templateAddress)
		dispatch(actionsNewRetroDrop.setDropAddress(drop))
		
	} catch (err) {
		console.log({
			err
		})
	}
  
	dispatch(actionsContract.setLoading(false))
	dispatch(actionsNewRetroDrop.completeStep('deploy_contract'))
	callback()
}


const deployContract = async (
	provider: any,
	merkleTree: TMerkleTree,
	tokenAddress: string,
	ipfsHash: string,
	factoryAddress: string,
	templateAddress: string
) => {
	const signer = await provider.getSigner()
	const proxyContract = await new ethers.Contract(factoryAddress, DropFactoryInterface, signer)
	const ipfsHexlified = hexlifyIpfsHash(ipfsHash)
	await proxyContract.createDrop(
		templateAddress,
		tokenAddress,
		merkleTree.merkleRoot,
		DECEMBER_31_2325,
		ipfsHexlified
	)
	
	const checkReceipt = async function (): Promise<string> {
		return new Promise((resolve, reject) => {
			proxyContract.on("CreateDrop", (
				drop: string,
				token: string,
				template: string,
				expiration: any,
				ipfs: string,
				event
			) => { 
				if (ipfsHexlified === ipfs) {
					resolve(drop)
				}
		})
		})
	}
	return await checkReceipt()
	 
}