import { buildMerkleTreeERC1155 } from '../src'
// import { randomBytes } from '@ethersproject/random';
// import { computeAddress } from '@ethersproject/transactions';
// import { SigningKey } from '@ethersproject/signing-key';
import { ethers } from 'ethers'

type DataOldFormat = {
    [account: string]: {
        amount: number | string,
        tokenId: number | string,
        maxSupply: number
    }
}

// type DataNewFormat = {
//     address: string;
//     earnings: string;
//     reasons: string;
//     tokenId: number | string;
//     maxSupply: string
// }

describe('buildMerkleTreeERC1155', () => {
    it('should build Merkle tree for erc1155 NFTs', async () => {
        console.log('gn')
        const wallet1 = ethers.Wallet.createRandom()
        const wallet2 = ethers.Wallet.createRandom()
        const wallet3 = ethers.Wallet.createRandom()

        const data: DataOldFormat = {}

        data[wallet1.address] = {
            amount: 1,
            tokenId: 1,
            maxSupply: 3
        }

        data[wallet2.address] = {
            amount: 1,
            tokenId: 1,
            maxSupply: 3
        }
        data[wallet3.address] = {
            amount: 1,
            tokenId: 1,
            maxSupply: 3
        }


        const result = buildMerkleTreeERC1155(data);
        console.log({ result })
    })
})
