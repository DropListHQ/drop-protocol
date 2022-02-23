import { Contract } from 'ethers';
import { DropFactoryInterface } from './contracts/interfaces';
import { hexlifyIpfsHash } from './utils';

export default class Factory {
    public readonly contract: Contract;
    public readonly provider: any;
    public readonly address: string;

    constructor(provider: any, address: string) {
        this.address = address;
        this.contract = new Contract(this.address, DropFactoryInterface, provider);
    }

    getDrop(ipfshash: string) {
        return this.contract.getDrop(hexlifyIpfsHash(ipfshash));
    }
}
