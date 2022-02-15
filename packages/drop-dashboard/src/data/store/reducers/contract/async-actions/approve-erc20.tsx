import { Dispatch } from 'redux';
import * as actionsContract from '../actions';
import * as actionsDrops from 'data/store/reducers/drops/actions';
import * as newRetroDropDrops from 'data/store/reducers/new-retro-drop/actions';
import { ContractActions } from '../types';
import { NewRetroDropActions } from 'data/store/reducers/new-retro-drop/types';
import { DropsActions } from 'data/store/reducers/drops/types';
import { ethers } from 'ethers';
import { TRecipientsData, TRetroDropType } from 'types'
import { ERC20Contract } from 'abi'

export default async function approveERC20(
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
		const gasPrice = await provider.getGasPrice()
		const oneGwei = ethers.utils.parseUnits('1', 'gwei')
		const tokenAmount = Object.values(recipients).reduce((sum, item) => BigInt(sum) + BigInt(item.amount), 0)
		console.log({ tokenAmount })
		const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract, signer)
		let iface = new ethers.utils.Interface(ERC20Contract);
		const data = await iface.encodeFunctionData('approve', [dropAddress, tokenAmount])
		await signer.sendTransaction({
			to: tokenAddress,
			gasPrice: gasPrice.add(oneGwei),
			from: userAddress,
			value: 0,
			data: data
		})

		const transaction = async function (): Promise<boolean> {
			return new Promise((resolve, reject) => {
				const checkInterval = setInterval(async () => {
					const allowed = await contractInstance.allowance(userAddress, dropAddress)
					console.log({ allowed, tokenAmount })
					if (allowed >= tokenAmount) {
						resolve(true)
						clearInterval(checkInterval)
					}
				}, 3000)
			})
		}
		const finished = await transaction()
		if (finished) {
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
				decimals,
				dropAddress
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
