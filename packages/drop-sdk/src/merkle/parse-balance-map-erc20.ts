import { BigNumber, utils } from 'ethers'
import BalanceTree from './balance-tree-erc20'

const { isAddress, getAddress } = utils

// This is the blob that gets distributed and pinned to IPFS.
// It is completely sufficient for recreating the entire merkle tree.
// Anyone can verify that all air drops are included in the tree,
// and the tree has no additional distributions.
export interface MerkleDistributorInfoERC20 {
    merkleRoot: string
    tokenTotal: string
    creationTime: string | number
    claims: {
        [account: string]: {
            index: number
            amount: string,
            proof: string[]
        }
    }
}

export type RecipientsDictFormatERC20 = {
    [account: string]: {
        amount: number | string
    }
}
export type RecipientsArrayFormatERC20 = {
    address: string;
    amount: string;
}

export default function parseBalanceMap(balances: RecipientsDictFormatERC20 | RecipientsArrayFormatERC20[]): MerkleDistributorInfoERC20 {
    // if balances are in an old format, process them
    const balancesInRecipientsArrayFormatERC20: RecipientsArrayFormatERC20[] = Array.isArray(balances)
        ? balances
        : Object.keys(balances).map(
            (account): RecipientsArrayFormatERC20 => ({
                address: account,
                amount: `0x${balances[account].amount.toString(16)}`
            })
        )

    const dataByAddress = balancesInRecipientsArrayFormatERC20.reduce<{
        [address: string]: {
            amount: BigNumber;
        }
    }>((memo, {
        address: account,
        amount
    }) => {
        if (!isAddress(account)) {
            throw new Error(`Found invalid address: ${account}`)
        }
        const parsed = getAddress(account)
        if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`)
        const parsedNum = BigNumber.from(amount)
        if (parsedNum.lte(0)) throw new Error(`Invalid amount for account: ${account}`)

        memo[parsed] = {
            amount: parsedNum
        }
        return memo
    }, {})

    const sortedAddresses = Object.keys(dataByAddress).sort()

    // construct a tree
    const tree = new BalanceTree(
        sortedAddresses.map((address) => {
            return {
                account: address,
                amount: dataByAddress[address].amount
            }
        })
    )
    // generate claims
    const claims = sortedAddresses.reduce<{
        [address: string]: {
            amount: string;
            index: number;
            proof: string[];
        }
    }>((memo, address, index) => {
        const { amount } = dataByAddress[address]
        memo[address] = {
            index,
            amount: amount.toHexString(),
            proof: tree.getProof(
                index,
                address,
                amount
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
