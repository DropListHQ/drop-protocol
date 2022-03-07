import defineNetworkName from './define-network-name'
type TDefineExplorerURL = (chainId: number) => string

const defineExplorerUrl: TDefineExplorerURL = (chainId) => {
  if (Number(chainId) === 1) { return 'https://etherscan.io' }
  if (Number(chainId) === 100) { return 'https://blockscout.com/poa/xdai' }
  if (Number(chainId) === 97) { return 'https://testnet.bscscan.com' }
  if (Number(chainId) === 56) { return 'https://bscscan.com' }
  if (Number(chainId) === 137) { return 'https://polygonscan.com' }
  const networkName = defineNetworkName(chainId)
  return `https://${networkName}.etherscan.io/`
}

export default defineExplorerUrl