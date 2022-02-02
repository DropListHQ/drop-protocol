// Code is forked and modified from Uniswap Merkle Distributor - https://github.com/Uniswap/merkle-distributor
import { BigNumber, utils } from 'ethers'
import BalanceTree from './balance-tree-erc1155'

const { isAddress, getAddress } = utils

// This is the blob that gets distributed and pinned to IPFS.
// It is completely sufficient for recreating the entire merkle tree.
// Anyone can verify that all air drops are included in the tree,
// and the tree has no additional distributions.
export interface MerkleDistributorInfoERC1155 {
    merkleRoot: string
    creationTime: string | number
    claims: {
        [account: string]: {
            index: number
            tokenId: string,
            amount: string,
            proof: string[]
        }
    }
}

export type RecipientsDictFormatERC1155 = {
    [account: string]: {
        tokenId: string,
        amount: string
    }
}
export type RecipientsArrayFormatERC1155 = {
    address: string;
    tokenId: string;
    amount: string;
}

export default function parseBalanceMap(balances: RecipientsDictFormatERC1155 | RecipientsArrayFormatERC1155[]): MerkleDistributorInfoERC1155 {
    // if balances are in an old format, process them
    const balancesInRecipientsArrayFormatERC1155: RecipientsArrayFormatERC1155[] = Array.isArray(balances)
        ? balances
        : Object.keys(balances).map(
            (account): RecipientsArrayFormatERC1155 => ({
                address: account,
                tokenId: balances[account].tokenId,
                amount: balances[account].amount
            })
        )

    const dataByAddress = balancesInRecipientsArrayFormatERC1155.reduce<{
        [address: string]: {
            amount: string;
            tokenId: string
        }
    }>((memo, {
        address: account,
        amount,
        tokenId
    }) => {
        if (!isAddress(account)) {
            throw new Error(`Found invalid address: ${account}`)
        }
        const parsed = getAddress(account)
        if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`)
        const parsedNum = BigNumber.from(amount)
        if (parsedNum.lte(0)) throw new Error(`Invalid amount for account: ${account}`)

        memo[parsed] = {
            tokenId,
            amount: parsedNum.toString()
        }
        return memo
    }, {})

    const sortedAddresses = Object.keys(dataByAddress).sort()

    // construct a tree
    const tree = new BalanceTree(
        sortedAddresses.map((address) => {
            return {
                account: address,
                tokenId: dataByAddress[address].tokenId,
                amount: dataByAddress[address].amount
            }
        })
    )
    // generate claims
    const claims = sortedAddresses.reduce<{
        [address: string]: {
            index: number;
            tokenId: string;
            amount: string;
            proof: string[];
        }
    }>((memo, address, index) => {
        const { tokenId, amount } = dataByAddress[address]
        memo[address] = {
            index,
            tokenId,
            amount: amount,
            proof: tree.getProof(
                index,
                address,
                tokenId,
                amount
            )
        }
        return memo
    }, {})

    return {
        merkleRoot: tree.getHexRoot(),
        claims,
        creationTime: +(new Date())
    }
}
