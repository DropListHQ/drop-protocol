import Drop from './Drop';
import IPFSProvider from './ipfs/provider';
import { TDropMetadata } from './types';


export default class DropSDK {
    public readonly ipfsbase: string;
    private readonly ipfsprovider: IPFSProvider;

    constructor(ipfsbase: string) {
        this.ipfsbase = ipfsbase;
        this.ipfsprovider = new IPFSProvider(ipfsbase);
    }

    async getDrop(ipfshash: string) {
        const metadata: TDropMetadata = await this.ipfsprovider.get(ipfshash)
        const drop = new Drop(ipfshash, metadata);
        return drop
    }
}
