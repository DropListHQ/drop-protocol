// import { TDropType, TRecipientsData } from './types'

// type TResponse = {
//     chainId: number;
//     tokenAddress: string;
//     claims: TRecipientsData,
//     title: string,
//     logoURL: string,
//     description: string,
//     type: TDropType
// }

export default class Drop {
    public readonly ipfshash: string;

    constructor(ipfshash: string) {
        this.ipfshash = ipfshash;
    }

    fetchIpfsData() {
        // const { data }: { data: TResponse } = await getIPFSData.get(ipfs)
    }
}
