import { ethers } from 'ethers';

const hexlifyIpfsHash = (hash: string) => ethers.utils.hexlify(ethers.utils.base58.decode(hash).slice(2))

export default hexlifyIpfsHash