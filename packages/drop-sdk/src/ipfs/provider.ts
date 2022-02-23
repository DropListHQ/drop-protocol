import axios from 'axios'

export default class IPFSProvider {
    private readonly baseURL: string;
    private readonly api: any;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.api = axios.create({
            baseURL: this.baseURL
        })
    }

    async get(ipfs: string) {
        const { data } = await this.api.get(`/${ipfs}`);
        return data;
    }
}
