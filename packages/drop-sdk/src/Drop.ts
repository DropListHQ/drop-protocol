import { TDropMetadata, TRecipientsData, TDropType } from './types';
import { Contract } from 'ethers';
import { DropInterfaceERC1155 } from './contracts/interfaces';

export default class Drop {
    public readonly ipfshash: string;
    public readonly metadata: TDropMetadata;
    public readonly chainId: number;
    public readonly tokenAddress: string;
    public readonly type: TDropType;
    public readonly contract: Contract;
    public readonly claims: TRecipientsData;
    public readonly address: string;

    constructor(ipfshash: string, metadata: TDropMetadata, provider: any, address: string) {
        this.ipfshash = ipfshash;
        this.metadata = metadata;
        this.chainId = metadata.chainId;
        this.tokenAddress = metadata.tokenAddress;
        this.type = metadata.type;
        this.claims = metadata.claims;
        this.address = address;
        this.contract = new Contract(this.address, DropInterfaceERC1155, provider)
    }

    getRecipients() {
        return Object.keys(this.claims)
    }

    hasReceiverClaimed(recipient: string) {
        return this.contract.isClaimed(this.claims[recipient].index);
    }
}
