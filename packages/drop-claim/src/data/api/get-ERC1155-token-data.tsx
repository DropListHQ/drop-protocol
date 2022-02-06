import axios from 'axios'

const getERC1155TokenData = (url: string, tokenId: string) => {
  const tokenDataURL = url.replace('0x{id}', tokenId)
  return axios(tokenDataURL)
}

export default getERC1155TokenData
