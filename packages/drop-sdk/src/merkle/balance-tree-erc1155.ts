// Code is forked and modified from Uniswap Merkle Distributor - https://github.com/Uniswap/merkle-distributor
import MerkleTree from './merkle-tree'
import { BigNumber, utils } from 'ethers'

export default class BalanceTreeERC1155 {
    private readonly tree: MerkleTree
    constructor(balances: { account: string; amount: string, tokenId: string }[]) {
        this.tree = new MerkleTree(
            balances.map(({ account, amount, tokenId }, index) => {
                return BalanceTreeERC1155.toNode(index, account, tokenId, amount)
            })
        )
    }

    public static verifyProof(
        index: number | BigNumber,
        account: string,
        tokenId: string,
        amount: string,
        proof: Buffer[],
        root: Buffer
    ): boolean {
        let pair = BalanceTreeERC1155.toNode(index, account, tokenId, amount)
        for (const item of proof) {
            pair = MerkleTree.combinedHash(pair, item)
        }
        return pair.equals(root)
    }

    // keccak256(abi.encode(index, account, amount, tokenId))
    public static toNode(
        index: number | BigNumber,
        account: string,
        tokenId: string,
        amount: string
    ): Buffer {
        return Buffer.from(
            utils.solidityKeccak256(['uint256', 'address', 'uint256', 'uint256'], [index, account, tokenId, amount]).substr(2),
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
        tokenId: string,
        amount: string
    ): string[] {
        return this.tree.getHexProof(BalanceTreeERC1155.toNode(index, account, tokenId, amount))
    }
}
