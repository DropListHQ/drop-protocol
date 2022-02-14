import Drop from './Drop';
import IPFSProvider from './ipfs/provider';
import { TDropType, TRecipientsData } from './types';

type TResponse = {
    chainId: number;
    tokenAddress: string;
    claims: TRecipientsData,
    title: string,
    logoURL: string,
    description: string,
    type: TDropType
}

export default class DropSDK {
    public readonly ipfsbase: string;
    private readonly ipfsprovider: IPFSProvider;

    constructor(ipfsbase: string) {
        this.ipfsbase = ipfsbase;
        this.ipfsprovider = new IPFSProvider(ipfsbase);
    }

    async getDrop(ipfshash: string) {
        const drop = new Drop(ipfshash);

        const data: TResponse = await this.ipfsprovider.get(ipfshash)
        console.log({ data })

        return drop
    }
}
