import Drop from './Drop';
import IPFSProvider from './ipfs/provider';
import { TDropMetadata } from './types';

const DEFAULT_IPFS_BASE = 'https://gateway.pinata.cloud/ipfs';

export default class DropSDK {
    public readonly ipfsbase: string;
    private readonly ipfsprovider: IPFSProvider;

    constructor(ipfsbase: string = DEFAULT_IPFS_BASE) {
        this.ipfsbase = ipfsbase;
        this.ipfsprovider = new IPFSProvider(ipfsbase);
    }

    async getDrop(ipfshash: string) {
        const metadata: TDropMetadata = await this.ipfsprovider.get(ipfshash)
        const drop = new Drop(ipfshash, metadata);
        return drop
    }
}
