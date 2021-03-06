// Code is forked and modified from Uniswap Merkle Distributor - https://github.com/Uniswap/merkle-distributor
import MerkleTree from './merkle-tree'
import { BigNumber, utils } from 'ethers'

export default class BalanceTreeERC20 {
    private readonly tree: MerkleTree
    constructor(balances: { account: string; amount: string }[]) {
        this.tree = new MerkleTree(
            balances.map(({ account, amount }, index) => {
                return BalanceTreeERC20.toNode(index, account, amount)
            })
        )
    }

    public static verifyProof(
        index: number | BigNumber,
        account: string,
        amount: string,
        proof: Buffer[],
        root: Buffer
    ): boolean {
        let pair = BalanceTreeERC20.toNode(index, account, amount)
        for (const item of proof) {
            pair = MerkleTree.combinedHash(pair, item)
        }

        return pair.equals(root)
    }

    // keccak256(abi.encode(index, account, amount))
    public static toNode(
        index: number | BigNumber,
        account: string,
        amount: string
    ): Buffer {
        return Buffer.from(
            utils.solidityKeccak256(['uint256', 'address', 'uint256'], [index, account, amount]).substr(2),
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
        amount: string
    ): string[] {
        return this.tree.getHexProof(BalanceTreeERC20.toNode(index, account, amount))
    }
}
