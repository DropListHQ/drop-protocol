const defineEtherscanUrl = (chainId: number | null, txhash: string) : string => {
  switch (chainId) {
    case 1: return `https://etherscan.io/address/${txhash}`
    case 4: return `https://rinkeby.etherscan.io/address/${txhash}`
    case 137: return `https://polygonscan.com/address/${txhash}`
    case 80001: return `https://mumbai.polygonscan.com/address/${txhash}`
    default: return `https://etherscan.io/address/${txhash}`
  }
}

export default defineEtherscanUrl