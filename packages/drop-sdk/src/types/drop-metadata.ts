import TDropType from './drop-type';
import TRecipientsData from './recipients-data';

type TDropMetadata = {
    chainId: number;
    tokenAddress: string;
    claims: TRecipientsData,
    title: string,
    logoURL: string,
    description: string,
    type: TDropType
}

export default TDropMetadata
