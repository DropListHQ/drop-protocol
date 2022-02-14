import { TDropMetadata } from './types';

export default class Drop {

    public readonly ipfshash: string;
    public readonly metadata: TDropMetadata;

    constructor(ipfshash: string, metadata: TDropMetadata) {
        this.ipfshash = ipfshash;
        this.metadata = metadata;
    }
}
