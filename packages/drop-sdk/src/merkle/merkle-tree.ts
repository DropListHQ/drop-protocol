// import { bufferToHex } from 'ethereumjs-util'
import { keccak256 } from '@ethersproject/keccak256';
import { arrayify, hexlify } from '@ethersproject/bytes';

export default class MerkleTree {
    private readonly elements: Buffer[]
    private readonly bufferElementPositionIndex: { [hexElement: string]: number }
    private readonly layers: Buffer[][]

    constructor(elements: Buffer[]) {
        this.elements = [...elements]
        // Sort elements
        this.elements.sort(Buffer.compare)
        // Deduplicate elements
        this.elements = MerkleTree.bufDedup(this.elements)

        this.bufferElementPositionIndex = this.elements.reduce<{ [hexElement: string]: number }>((memo, el, index) => {
            memo[hexlify(arrayify(el))] = index
            return memo
        }, {})

        // Create layers
        this.layers = this.getLayers(this.elements)
    }

    getLayers(elements: Buffer[]): Buffer[][] {
        if (elements.length === 0) {
            throw new Error('empty tree')
        }

        const layers = []
        layers.push(elements)

        // Get next layer until we reach the root
        while (layers[layers.length - 1].length > 1) {
            layers.push(this.getNextLayer(layers[layers.length - 1]))
        }

        return layers
    }

    getNextLayer(elements: Buffer[]): Buffer[] {
        return elements.reduce<Buffer[]>((layer, el, idx, arr) => {
            if (idx % 2 === 0) {
                // Hash the current element with its pair element
                layer.push(MerkleTree.combinedHash(el, arr[idx + 1]))
            }

            return layer
        }, [])
    }

    static combinedHash(first: Buffer, second: Buffer): Buffer {
        if (!first) {
            return second
        }
        if (!second) {
            return first
        }
        const combinedhash = keccak256(MerkleTree.sortAndConcat(first, second))
        const bufhash = Buffer.from(combinedhash.substr(2), "hex")
        return bufhash
    }

    getRoot(): Buffer {
        return this.layers[this.layers.length - 1][0]
    }

    getHexRoot(): string {
        const hexroot = hexlify(arrayify(this.getRoot()))
        return hexroot
    }

    getProof(el: Buffer) {
        let idx = this.bufferElementPositionIndex[hexlify(arrayify(el))]

        if (typeof idx !== 'number') {
            throw new Error('Element does not exist in Merkle tree')
        }

        return this.layers.reduce((proof, layer) => {
            const pairElement = MerkleTree.getPairElement(idx, layer)

            if (pairElement) {
                proof.push(pairElement)
            }

            idx = Math.floor(idx / 2)

            return proof
        }, [])
    }

    getHexProof(el: Buffer): string[] {
        const proof = this.getProof(el)

        return MerkleTree.bufArrToHexArr(proof)
    }

    private static getPairElement(idx: number, layer: Buffer[]): Buffer | null {
        const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1

        if (pairIdx < layer.length) {
            return layer[pairIdx]
        } else {
            return null
        }
    }

    private static bufDedup(elements: Buffer[]): Buffer[] {
        return elements.filter((el, idx) => {
            return idx === 0 || !elements[idx - 1].equals(el)
        })
    }

    private static bufArrToHexArr(arr: Buffer[]): string[] {
        if (arr.some((el) => !Buffer.isBuffer(el))) {
            throw new Error('Array is not an array of buffers')
        }

        return arr.map((el) => '0x' + el.toString('hex'))
    }

    private static sortAndConcat(...args: Buffer[]): Buffer {
        return Buffer.concat([...args].sort(Buffer.compare))
    }
}
