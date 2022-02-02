import { parseUnits, formatUnits } from "@ethersproject/units";
import { buildMerkleTreeERC20, RecipientsDictFormatERC20 } from '../src'


describe('buildMerkleTreeERC20', () => {
    it('should build Merkle tree for erc20 tokens', async () => {

        const data: RecipientsDictFormatERC20 = {
            '0x88EC069E5151cFad602A06AD13fea7e87Ba089C8': { amount: parseUnits("100.25", 18).toString() },
            '0x092464dFF81eAb2111D0A7f8d6334Ef31f4eF5Da': { amount: parseUnits("200.0", 18).toString() },
            '0xBb41E77278c0f4afE9F4cF1Ee8866432FE024482': { amount: parseUnits("300", 18).toString() }
        }

        const result = buildMerkleTreeERC20(data);

        expect(Object.keys(result.claims).length).toEqual(3);
        expect(result.merkleRoot).toEqual('0x1e7d294c939a0873d73aef8b97149544144cb3039e0580ca3d9e6c54b1c2823c');

        const claim1 = result.claims['0x88EC069E5151cFad602A06AD13fea7e87Ba089C8'];
        expect(formatUnits(claim1.amount, 18)).toEqual("100.25");
        expect(claim1.proof.length).toBeGreaterThan(0);

        const claim2 = result.claims['0x092464dFF81eAb2111D0A7f8d6334Ef31f4eF5Da'];
        expect(formatUnits(claim2.amount, 18)).toEqual("200.0");
        expect(claim2.proof.length).toBeGreaterThan(0);

        const claim3 = result.claims['0xBb41E77278c0f4afE9F4cF1Ee8866432FE024482'];
        expect(formatUnits(claim3.amount, 18)).toEqual("300.0");
        expect(claim3.proof.length).toBeGreaterThan(0);
    })
})
