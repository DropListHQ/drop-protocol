import Drop from './Drop';

export const getDrop = (ipfshash: string): Drop => {
    return new Drop(ipfshash);
}
