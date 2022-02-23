import Factory from './Factory';
import { DropERC20, DropERC721, DropERC1155 } from './Drop';
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
        const dropAddress = await this.factory.getDrop(ipfshash);
        let drop: DropERC1155 | DropERC20 | DropERC721;
        switch (metadata.type) {
            case "erc20":
                drop = new DropERC20(ipfshash, metadata, this.provider, dropAddress);
                break;
            case "erc721":
                drop = new DropERC721(ipfshash, metadata, this.provider, dropAddress);
                break;
            case "erc1155":
                drop = new DropERC1155(ipfshash, metadata, this.provider, dropAddress);
                break;
            default:
                throw new Error(`Unknown drop type ${metadata.type}`);
        }
        return drop
    }
}
