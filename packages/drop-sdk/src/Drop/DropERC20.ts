import { Contract } from 'ethers';
import { TDropMetadata } from '../types';
import { DropInterfaceERC20 } from '../contracts/interfaces';
import DropBase from './DropBase';
import IDrop from './IDrop';

export default class DropERC20 extends DropBase implements IDrop {
    public readonly contract: Contract;

    constructor(ipfshash: string, metadata: TDropMetadata, provider: any, address: string) {
        super(ipfshash, metadata, address);
        this.contract = new Contract(this.address, DropInterfaceERC20, provider);
    }

    getRecipients(): string[] {
        return super.getRecipients();
    }

    hasReceiverClaimed(recipient: string): boolean {
        return super.hasReceiverClaimed(recipient);
    }
}
