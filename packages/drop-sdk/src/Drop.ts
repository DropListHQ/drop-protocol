import { TDropMetadata, TRecipientsData } from './types';

export default class Drop {
    public readonly ipfshash: string;
    public readonly metadata: TDropMetadata;
    public readonly chainId: number;
    public readonly tokenAddress: string;
    public readonly type: string;
    public readonly claims: TRecipientsData;

    constructor(ipfshash: string, metadata: TDropMetadata) {
        this.ipfshash = ipfshash;
        this.metadata = metadata;
        this.chainId = metadata.chainId;
        this.tokenAddress = metadata.tokenAddress;
        this.type = metadata.type;
        this.claims = metadata.claims;
    }
}
