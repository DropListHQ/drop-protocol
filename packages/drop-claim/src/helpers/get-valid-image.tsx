import { IPFSRedefineUrl } from 'helpers'
import nftPlaceholder from 'images/nft-placeholder.png'

const getValidImage = async (imageUrl: string) => {
  if (!imageUrl) {
    return nftPlaceholder
  }
  try {
    const redefinedURL = IPFSRedefineUrl(imageUrl)
    const checkImage = await fetch(redefinedURL)
    if (checkImage.status === 404) { throw new Error() }
    return redefinedURL
  } catch (err) {
    return nftPlaceholder
  }
}
export default getValidImage