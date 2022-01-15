import { BigNumber, utils } from 'ethers'
import BalanceTree from './balance-tree'

const { isAddress, getAddress } = utils

// This is the blob that gets distributed and pinned to IPFS.
// It is completely sufficient for recreating the entire merkle tree.
// Anyone can verify that all air drops are included in the tree,
// and the tree has no additional distributions.
interface MerkleDistributorInfo {
  merkleRoot: string
  tokenTotal: string
  creationTime: string | number
  claims: {
    [account: string]: {
      index: number
      amount: string
      proof: string[]
      flags?: {
        [flag: string]: boolean
      }
    }
  }
}

type OldFormat = {
  [account: string]: {
    amount: number | string,
    tokenId: number | string,
    maxSupply: number
  }
}
type NewFormat = {
  address: string;
  earnings: string;
  reasons: string;
  tokenId: number | string;
  maxSupply: string
}

export default function parseBalanceMap(balances: OldFormat | NewFormat[]): MerkleDistributorInfo {
  // if balances are in an old format, process them
  const balancesInNewFormat: NewFormat[] = Array.isArray(balances)
    ? balances
    : Object.keys(balances).map(
        (account): NewFormat => ({
          address: account,
          earnings: `0x${balances[account].amount.toString(16)}`,
          reasons: '',
          tokenId: balances[account].tokenId,
          maxSupply: `0x${balances[account].maxSupply.toString(16)}`
        })
      )

  const dataByAddress = balancesInNewFormat.reduce<{
    [address: string]: {
      amount: BigNumber;
      tokenId: number | string,
      maxSupply: BigNumber,
      flags?: {
        [flag: string]: boolean
      }
    }
  }>((memo, {
    address: account,
    earnings,
    reasons,
    tokenId,
    maxSupply
  }) => {
    if (!isAddress(account)) {
      throw new Error(`Found invalid address: ${account}`)
    }
    const parsed = getAddress(account)
    if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`)
    const parsedNum = BigNumber.from(earnings)
    const parsedMaxSupply = BigNumber.from(maxSupply)
    if (parsedNum.lte(0)) throw new Error(`Invalid amount for account: ${account}`)

    const flags = {
      isSOCKS: reasons.includes('socks'),
      isLP: reasons.includes('lp'),
      isUser: reasons.includes('user'),
    }

    memo[parsed] = {
      amount: parsedNum,
      maxSupply: parsedMaxSupply,
      tokenId,
      ...(reasons === '' ? {} : { flags })
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
      maxSupply: string | number,
      flags?: {
        [flag: string]: boolean
      }
    }
  }>((memo, address, index) => {
    const { amount, flags, tokenId, maxSupply } = dataByAddress[address]
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
      ),
      ...(flags ? { flags } : {}),
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