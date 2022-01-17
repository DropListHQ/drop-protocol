import { BigNumber, utils } from 'ethers'
import BalanceTree from './balance-tree'

const { isAddress, getAddress } = utils

// This is the blob that gets distributed and pinned to IPFS.
// It is completely sufficient for recreating the entire merkle tree.
// Anyone can verify that all air drops are included in the tree,
// and the tree has no additional distributions.
export interface MerkleDistributorInfoERC1155 {
    merkleRoot: string
    tokenTotal: string
    creationTime: string | number
    claims: {
        [account: string]: {
            index: number
            amount: string,
            tokenId: string | number,
            maxSupply: string | number,
            proof: string[]
        }
    }
}

export type RecipientsDictFormatERC1155 = {
    [account: string]: {
        amount: number | string,
        tokenId: number | string,
        maxSupply: number | string
    }
}
export type RecipientsArrayFormatERC1155 = {
    address: string;
    amount: string;
    tokenId: number | string;
    maxSupply: string
}

export default function parseBalanceMap(balances: RecipientsDictFormatERC1155 | RecipientsArrayFormatERC1155[]): MerkleDistributorInfoERC1155 {
    // if balances are in an old format, process them
    const balancesInRecipientsArrayFormatERC1155: RecipientsArrayFormatERC1155[] = Array.isArray(balances)
        ? balances
        : Object.keys(balances).map(
            (account): RecipientsArrayFormatERC1155 => ({
                address: account,
                amount: `0x${balances[account].amount.toString(16)}`,
                tokenId: balances[account].tokenId,
                maxSupply: `0x${balances[account].maxSupply.toString(16)}`
            })
        )

    const dataByAddress = balancesInRecipientsArrayFormatERC1155.reduce<{
        [address: string]: {
            amount: BigNumber;
            tokenId: number | string,
            maxSupply: BigNumber
        }
    }>((memo, {
        address: account,
        amount,
        tokenId,
        maxSupply
    }) => {
        if (!isAddress(account)) {
            throw new Error(`Found invalid address: ${account}`)
        }
        const parsed = getAddress(account)
        if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`)
        const parsedNum = BigNumber.from(amount)
        const parsedMaxSupply = BigNumber.from(maxSupply)
        if (parsedNum.lte(0)) throw new Error(`Invalid amount for account: ${account}`)

        memo[parsed] = {
            amount: parsedNum,
            maxSupply: parsedMaxSupply,
            tokenId
        }
        return memo
    }, {})

    const sortedAddresses = Object.keys(dataByAddress).sort()

    // construct a tree
    const tree = new BalanceTree(
        sortedAddresses.map((address) => {
            return {
                account: address,
                amount: dataByAddress[address].amount,
                tokenId: dataByAddress[address].tokenId,
                maxSupply: dataByAddress[address].maxSupply
            }
        })
    )
    // generate claims
    const claims = sortedAddresses.reduce<{
        [address: string]: {
            amount: string;
            index: number;
            proof: string[];
            tokenId: number | string,
            maxSupply: string | number
        }
    }>((memo, address, index) => {
        const { amount, tokenId, maxSupply } = dataByAddress[address]
        memo[address] = {
            index,
            amount: amount.toHexString(),
            tokenId,
            maxSupply: maxSupply.toHexString(),
            proof: tree.getProof(
                index,
                address,
                amount,
                tokenId,
                maxSupply
            )
        }
        return memo
    }, {})

    const tokenTotal: BigNumber = sortedAddresses.reduce<BigNumber>(
        (memo, key) => memo.add(dataByAddress[key].amount),
        BigNumber.from(0)
    )

    return {
        merkleRoot: tree.getHexRoot(),
        tokenTotal: tokenTotal.toHexString(),
        claims,
        creationTime: +(new Date())
    }
}
