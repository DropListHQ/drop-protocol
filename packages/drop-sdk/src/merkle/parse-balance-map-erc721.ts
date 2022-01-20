import { BigNumber, utils } from 'ethers'
import BalanceTree from './balance-tree-erc721'

const { isAddress, getAddress } = utils

// This is the blob that gets distributed and pinned to IPFS.
// It is completely sufficient for recreating the entire merkle tree.
// Anyone can verify that all air drops are included in the tree,
// and the tree has no additional distributions.
export interface MerkleDistributorInfoERC721 {
    merkleRoot: string
    tokenTotal: string
    creationTime: string | number
    claims: {
        [account: string]: {
            index: number
            tokenId: string | number,
            proof: string[]
        }
    }
}

export type RecipientsDictFormatERC721 = {
    [account: string]: {
        tokenId: number | string
    }
}
export type RecipientsArrayFormatERC721 = {
    address: string;
    tokenId: number | string;
}

export default function parseBalanceMap(balances: RecipientsDictFormatERC721 | RecipientsArrayFormatERC721[]): MerkleDistributorInfoERC721 {
    // if balances are in an old format, process them
    const balancesInRecipientsArrayFormatERC721: RecipientsArrayFormatERC721[] = Array.isArray(balances)
        ? balances
        : Object.keys(balances).map(
            (account): RecipientsArrayFormatERC721 => ({
                address: account,
                tokenId: balances[account].tokenId
            })
        )

    const dataByAddress = balancesInRecipientsArrayFormatERC721.reduce<{
        [address: string]: {
            tokenId: number | string
        }
    }>((memo, {
        address: account,
        tokenId
    }) => {
        if (!isAddress(account)) {
            throw new Error(`Found invalid address: ${account}`)
        }

        const parsed = getAddress(account)
        if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`)

        memo[parsed] = {
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
                tokenId: dataByAddress[address].tokenId
            }
        })
    )
    // generate claims
    const claims = sortedAddresses.reduce<{
        [address: string]: {
            index: number;
            tokenId: number | string;
            proof: string[];
        }
    }>((memo, address, index) => {
        const { tokenId } = dataByAddress[address]
        memo[address] = {
            index,
            tokenId,
            proof: tree.getProof(
                index,
                address,
                tokenId
            )
        }
        return memo
    }, {})

    const tokenTotal: BigNumber = sortedAddresses.reduce<BigNumber>(
        (memo) => memo.add(1),
        BigNumber.from(0)
    )

    return {
        merkleRoot: tree.getHexRoot(),
        tokenTotal: tokenTotal.toHexString(),
        claims,
        creationTime: +(new Date())
    }
}
