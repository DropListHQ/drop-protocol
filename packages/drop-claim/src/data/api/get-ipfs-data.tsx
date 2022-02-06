import axios from 'axios'


const { REACT_APP_IPFS_URL } = process.env

const pinataApi = axios.create({
  baseURL: REACT_APP_IPFS_URL
})




const requests = {
  get: (ipfs: string) => pinataApi.get(`/${ipfs}`)
}

export default requests
