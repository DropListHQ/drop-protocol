import axios from 'axios'

const getERC721TokenData = (url: string) => {
  return axios(url)
}

export default getERC721TokenData
