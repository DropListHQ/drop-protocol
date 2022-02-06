import dropPlaceholder from 'images/drop-placeholder.png'

const getValidImage = async (imageUrl: string) => {
  if (!imageUrl || (!imageUrl.includes('https://') && !imageUrl.includes('http://') && !imageUrl.includes('base64'))) {
    return dropPlaceholder
  }
  try {
    const checkImage = await fetch(imageUrl)
    if (checkImage.status > 299) { throw new Error() }
    console.log(checkImage.status)
    return imageUrl
  } catch (err) {
    return dropPlaceholder
  }
}
export default getValidImage