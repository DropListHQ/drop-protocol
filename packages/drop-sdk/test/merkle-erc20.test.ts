import { buildMerkleTreeERC20, RecipientsDictFormatERC20 } from '../src'
import { hexlify } from '@ethersproject/bytes';

describe('buildMerkleTreeERC20', () => {
    it('should build Merkle tree for erc20 tokens', async () => {
        const data: RecipientsDictFormatERC20 = {
            '0x88EC069E5151cFad602A06AD13fea7e87Ba089C8': { amount: 100 },
            '0x092464dFF81eAb2111D0A7f8d6334Ef31f4eF5Da': { amount: 200 },
            '0xBb41E77278c0f4afE9F4cF1Ee8866432FE024482': { amount: 300 }
        }

        const result = buildMerkleTreeERC20(data);

        expect(Object.keys(result.claims).length).toEqual(3);
        expect(result.merkleRoot).toEqual('0x945e069ba6f75ad1b00ffb34ebf1e6969813bf79df36c86170e1104f6d394fd8');

        const claim = result.claims['0x88EC069E5151cFad602A06AD13fea7e87Ba089C8'];
        expect(claim.amount).toEqual(hexlify(100));
        expect(claim.proof.length).toBeGreaterThan(0);
    })
})
