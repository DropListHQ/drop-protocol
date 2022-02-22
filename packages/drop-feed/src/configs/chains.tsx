const { REACT_APP_INFURA_ID } = process.env

type TChains = {
  [chainId: number]: {
    chainName: string,
    displayName: string,
    nativeCurrency: {
      name: string,
      symbol: string,
      decimals: number
    },
    rpcUrls: string[],
    blockExplorerUrls: string[]
  }
}

const chains: TChains = {
  137: {
    chainName: 'Polygon',
    displayName: 'Polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: [
      'https://polygon-rpc.com/'
    ],
    blockExplorerUrls: [
      'https://matic.network'
    ]
  },
  1: {
    chainName: 'Ethereum Mainnet',
    displayName: 'Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [
      `https://mainnet.infura.io/v3/${REACT_APP_INFURA_ID}`
    ],
    blockExplorerUrls: [
      'https://etherscan.io'
    ]
  },
  4: {
    chainName: 'Rinkeby Testnet',
    displayName: 'Rinkeby',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [
      `https://rinkeby.infura.io/v3/${REACT_APP_INFURA_ID}`
    ],
    blockExplorerUrls: [
      'https://rinkeby.etherscan.io'
    ]
  }
}

export default chains