import Factory from './Factory';
import Drop from './Drop';
import IPFSProvider from './ipfs/provider';
import { TDropMetadata } from './types';
import contracts from './config/contracts';

const DEFAULT_IPFS_BASE = 'https://gateway.pinata.cloud/ipfs';

export default class DropSDK {
    public readonly ipfsbase: string;
    public readonly chainId: number;
    private readonly ipfsprovider: IPFSProvider;
    private readonly provider: any;
    private readonly factory: Factory;

    constructor(provider: any, chainId: number, ipfsbase: string = DEFAULT_IPFS_BASE) {
        this.ipfsprovider = new IPFSProvider(ipfsbase);
        this.provider = provider;
        this.chainId = chainId;
        this.ipfsbase = ipfsbase;

        const factoryAddress = contracts[`${this.chainId}`].factory;
        this.factory = new Factory(this.provider, factoryAddress);
    }

    async getDrop(ipfshash: string) {
        const metadata: TDropMetadata = await this.ipfsprovider.get(ipfshash)
        const dropAddress = this.factory.getDrop(ipfshash);
        const drop = new Drop(ipfshash, metadata, this.provider, dropAddress);
        return drop
    }
}
