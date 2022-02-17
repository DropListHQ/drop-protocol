import { Contract } from 'ethers';
import { TDropMetadata } from '../types';
import { DropInterfaceERC721 } from '../contracts/interfaces';
import BaseDrop from './BaseDrop';

export default class DropERC721 extends BaseDrop {
    public readonly contract: Contract;

    constructor(ipfshash: string, metadata: TDropMetadata, provider: any, address: string) {
        super(ipfshash, metadata, address);
        this.contract = new Contract(this.address, DropInterfaceERC721, provider); ч
    }
}
