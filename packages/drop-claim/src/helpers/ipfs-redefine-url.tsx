const ipfsGatewayUrl = 'https://gateway.pinata.cloud/ipfs/'

const redefineURL = (url: string) => {
  if (url.startsWith('ipfs://')) {
    const urlParts = url.split('/')
    return `${ipfsGatewayUrl}/${urlParts[urlParts.length - 1]}`
  } else {
    return url
  }
}

export default redefineURL