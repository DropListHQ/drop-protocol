import MerkleTree from './merkle-tree'
import { BigNumber, utils } from 'ethers'

export default class BalanceTree {
    private readonly tree: MerkleTree
    constructor(balances: { account: string; amount: BigNumber, tokenId: string | number, maxSupply: BigNumber }[]) {
        this.tree = new MerkleTree(
            balances.map(({ account, amount, tokenId, maxSupply }, index) => {
                return BalanceTree.toNode(index, account, amount, tokenId, maxSupply)
            })
        )
    }

    public static verifyProof(
        index: number | BigNumber,
        account: string,
        amount: BigNumber,
        tokenId: number | string,
        proof: Buffer[],
        root: Buffer,
        maxSupply: BigNumber
    ): boolean {
        let pair = BalanceTree.toNode(index, account, amount, tokenId, maxSupply)
        for (const item of proof) {
            pair = MerkleTree.combinedHash(pair, item)
        }

        return pair.equals(root)
    }

    // keccak256(abi.encode(index, account, amount, tokenId, maxSupply))
    public static toNode(
        index: number | BigNumber,
        account: string,
        amount: BigNumber,
        tokenId: number | string,
        maxSupply: BigNumber
    ): Buffer {
        return Buffer.from(
            utils.solidityKeccak256(['uint256', 'uint256', 'address', 'uint256', 'uint256'], [index, tokenId, account, amount, maxSupply]).substr(2),
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
        tokenId: number | string,
        maxSupply: BigNumber
    ): string[] {
        return this.tree.getHexProof(BalanceTree.toNode(index, account, amount, tokenId, maxSupply))
    }
}
