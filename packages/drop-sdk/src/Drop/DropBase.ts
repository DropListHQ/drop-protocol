import { Contract } from 'ethers';
import { TDropMetadata, TRecipientsData, TDropType } from '../types';


export default abstract class DropBase {
    public readonly contract: Contract;
    public readonly ipfshash: string;
    public readonly metadata: TDropMetadata;
    public readonly chainId: number;
    public readonly tokenAddress: string;
    public readonly type: TDropType;
    public readonly claims: TRecipientsData;
    public readonly address: string;


    constructor(ipfshash: string, metadata: TDropMetadata, address: string) {
        this.ipfshash = ipfshash;
        this.metadata = metadata;
        this.chainId = metadata.chainId;
        this.tokenAddress = metadata.tokenAddress;
        this.type = metadata.type;
        this.claims = metadata.claims;
        this.address = address;
    }

    getRecipients(): string[] {
        return Object.keys(this.claims)
    }

    hasReceiverClaimed(recipient: string): boolean {
        return this.contract.isClaimed(this.claims[recipient].index);
    }
}
