import axios from 'axios'
const { REACT_APP_IPFS_URL } = process.env

console.log({ REACT_APP_IPFS_URL })
const pinataApi = axios.create({
  baseURL: REACT_APP_IPFS_URL
})

const requests = {
  post: (data) => pinataApi.post('/', data)
}

export default requests
