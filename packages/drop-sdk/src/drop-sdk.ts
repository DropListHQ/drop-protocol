import Drop from './Drop';

export default class DropSDK {
    public readonly ipfsbase: string;
    constructor(ipfsbase: string) {
        this.ipfsbase = ipfsbase;
    }

    getDrop(ipfshash: string) {
        return new Drop(ipfshash);
    }
}
