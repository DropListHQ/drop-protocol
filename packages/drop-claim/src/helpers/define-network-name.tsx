const defineNetworkName = (chainId: number | null) : string => {
  switch (chainId) {
    case 1: return 'mainnet'
    case 3: return 'ropsten'
    case 4: return 'rinkeby'
    case 5: return 'goerli'
    case 42: return 'kovan'
    case 100: return 'xdai'
    case 97: return 'bsc-testnet'
    case 56: return 'bsc'
    case 137: return 'matic'
    case 80001: return 'mumbai'
    default: return 'mainnet'
  }
}

export default defineNetworkName