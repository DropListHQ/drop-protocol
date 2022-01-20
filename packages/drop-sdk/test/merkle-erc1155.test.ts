import { buildMerkleTreeERC1155, RecipientsDictFormatERC1155 } from '../src'
import { hexlify } from '@ethersproject/bytes';

describe('buildMerkleTreeERC1155', () => {
    it('should build Merkle tree for erc1155 NFTs', async () => {
        const data: RecipientsDictFormatERC1155 = {
            '0x88EC069E5151cFad602A06AD13fea7e87Ba089C8': { amount: 1, tokenId: 1 },
            '0x092464dFF81eAb2111D0A7f8d6334Ef31f4eF5Da': { amount: 1, tokenId: 1 },
            '0xBb41E77278c0f4afE9F4cF1Ee8866432FE024482': { amount: 1, tokenId: 1 }
        }

        const result = buildMerkleTreeERC1155(data);

        expect(Object.keys(result.claims).length).toEqual(3);
        expect(result.merkleRoot).toEqual('0x9d1bd4badb9034765e3689d0f0bc9ca6f5217a81f67c810ccf2c2e0fd25477f2');

        const claim = result.claims['0x88EC069E5151cFad602A06AD13fea7e87Ba089C8'];
        expect(claim.amount).toEqual(hexlify(1));
        expect(claim.tokenId).toEqual(1);
        expect(claim.proof.length).toBeGreaterThan(0);
    })
})
