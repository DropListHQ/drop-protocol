import { Dispatch } from 'redux';
import * as actionsContract from '../actions';
import * as actionsDrops from 'data/store/reducers/drops/actions';
import { ContractActions } from '../types';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types';
import { DropsActions } from 'data/store/reducers/drops/types';
import { ethers } from 'ethers';
import { TRecipientsData, TRetroDropType } from 'types'
import { ERC721Contract } from 'abi'
import * as newRetroDropDrops from 'data/store/reducers/new-retro-drop/actions';

export default async function approveERC721(
	dispatch: Dispatch<ContractActions> & Dispatch<NewRetroDropActions> & Dispatch<DropsActions>,
	provider: any,
	tokenAddress: string,
	userAddress: string,
	dropAddress: string,
	ipfsHash: string,
	title: string,
	address: string,
	chainId: number,
	description: string,
	logoURL: string,
	recipients: TRecipientsData,
	type: TRetroDropType,
	decimals: number | null,
	callback: () => void
) {
  dispatch(actionsContract.setLoading(true))
	try {
		const signer = await provider.getSigner()
		const contractInstance = await new ethers.Contract(tokenAddress, ERC721Contract, signer)
		await contractInstance.setApprovalForAll(dropAddress, true)
		const checkReceipt = async function (): Promise<boolean> {
			return new Promise((resolve, reject) => {
				const interval = setInterval(async function () {
					const isApproved = await contractInstance.isApprovedForAll(userAddress, dropAddress)
					console.log({ isApproved })
					if (isApproved) {
						clearInterval(interval)
						resolve(true)
					}
				}, 3000)
			})
		}
		const approved = await checkReceipt()
		if (approved) {
			alert(`DONE: ${ipfsHash}`)
			dispatch(actionsDrops.addNewRetroDrop({
				title,
				ipfsHash,
				address,
				chainId,
				description,
				logoURL,
				status: 'active',
				tokenAddress,
				recipients,
				type,
				decimals
			}))
			dispatch(newRetroDropDrops.clearNewRetroDrop())
			if (callback) { callback() }
		}
	} catch (err) {
		console.log({
			err
		})
	}
	dispatch(actionsContract.setLoading(false))
}
