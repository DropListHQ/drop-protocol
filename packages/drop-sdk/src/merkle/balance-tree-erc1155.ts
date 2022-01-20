import MerkleTree from './merkle-tree'
import { BigNumber, utils } from 'ethers'

export default class BalanceTreeERC1155 {
    private readonly tree: MerkleTree
    constructor(balances: { account: string; amount: BigNumber, tokenId: string | number }[]) {
        this.tree = new MerkleTree(
            balances.map(({ account, amount, tokenId }, index) => {
                return BalanceTreeERC1155.toNode(index, account, amount, tokenId)
            })
        )
    }

    public static verifyProof(
        index: number | BigNumber,
        account: string,
        amount: BigNumber,
        tokenId: number | string,
        proof: Buffer[],
        root: Buffer
    ): boolean {
        let pair = BalanceTreeERC1155.toNode(index, account, amount, tokenId)
        for (const item of proof) {
            pair = MerkleTree.combinedHash(pair, item)
        }

        return pair.equals(root)
    }

    // keccak256(abi.encode(index, account, amount, tokenId))
    public static toNode(
        index: number | BigNumber,
        account: string,
        amount: BigNumber,
        tokenId: number | string
    ): Buffer {
        return Buffer.from(
            utils.solidityKeccak256(['uint256', 'uint256', 'address', 'uint256'], [index, tokenId, account, amount]).substr(2),
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
        amount: BigNumber,
        tokenId: number | string
    ): string[] {
        return this.tree.getHexProof(BalanceTreeERC1155.toNode(index, account, amount, tokenId))
    }
}
