import MerkleTree from './merkle-tree'
import { BigNumber, utils } from 'ethers'

export default class BalanceTreeERC721 {
    private readonly tree: MerkleTree
    constructor(balances: { account: string; tokenId: string | number }[]) {
        this.tree = new MerkleTree(
            balances.map(({ account, tokenId }, index) => {
                return BalanceTreeERC721.toNode(index, account, tokenId)
            })
        )
    }

    public static verifyProof(
        index: number | BigNumber,
        account: string,
        tokenId: number | string,
        proof: Buffer[],
        root: Buffer
    ): boolean {
        let pair = BalanceTreeERC721.toNode(index, account, tokenId)
        for (const item of proof) {
            pair = MerkleTree.combinedHash(pair, item)
        }

        return pair.equals(root)
    }

    // keccak256(abi.encode(index, account, tokenId))
    public static toNode(
        index: number | BigNumber,
        account: string,
        tokenId: number | string
    ): Buffer {
        return Buffer.from(
            utils.solidityKeccak256(['uint256', 'address', 'uint256'], [index, account, tokenId]).substr(2),
            'hex'
        )
    }

    public getHexRoot(): string {
        return this.tree.getHexRoot()
    }

    // returns the hex bytes32 values of the proof
    public getProof(
        index: number | BigNumber,
        account: string,
        tokenId: number | string
    ): string[] {
        return this.tree.getHexProof(BalanceTreeERC721.toNode(index, account, tokenId))
    }
}
