import { buildMerkleTreeERC721, RecipientsDictFormatERC721 } from '../src'

describe('buildMerkleTreeERC721', () => {
    it('should build Merkle tree for erc721 NFTs', async () => {
        const data: RecipientsDictFormatERC721 = {
            '0x88EC069E5151cFad602A06AD13fea7e87Ba089C8': { tokenId: '1' },
            '0x092464dFF81eAb2111D0A7f8d6334Ef31f4eF5Da': { tokenId: '2' },
            '0xBb41E77278c0f4afE9F4cF1Ee8866432FE024482': { tokenId: '3' }
        }

        const result = buildMerkleTreeERC721(data);

        expect(Object.keys(result.claims).length).toEqual(3);
        expect(result.merkleRoot).toEqual('0x0d488f1cb986786cd7bef616fa11bf9964fc1b7f0d822a43104ec9ecdb4caffd');

        const claim = result.claims['0x88EC069E5151cFad602A06AD13fea7e87Ba089C8'];
        expect(claim.tokenId).toEqual('1');
        expect(claim.proof.length).toBeGreaterThan(0);
    })
})
