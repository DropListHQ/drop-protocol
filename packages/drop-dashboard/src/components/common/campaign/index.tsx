import { FC, useEffect, useState } from 'react'
import { Campaign, CampaignStatus, CampaignTitle, CampaignImage, CampaignButton } from './styled-components'
import { copyToClipboard } from 'helpers'
import { useHistory } from 'react-router-dom'
import { getValidImage } from 'helpers'

const { REACT_APP_CLAIM_URL } = process.env



type TProps = {
  status: 'active' | 'stopped' | 'draft',
  title: string,
  image: string,
  id: string
}

const CampaignComponent: FC<TProps> = ({
  title,
  image,
  id,
  status
}) => {
  const history = useHistory()
  const [ imageURL, setImageURL ] = useState(image)
  useEffect(() => {
    const defineImage = async () => {
      const image = await getValidImage(imageURL)
      if (image === imageURL) { return }
      setImageURL(image)
    }
    defineImage()
  }, [])
  return <Campaign>
    <CampaignStatus status={status}>{status}</CampaignStatus>
    <CampaignImage src={imageURL} />
    <CampaignTitle>{title}</CampaignTitle>
    <CampaignButton
      onClick={() => {
        history.push(`/campaigns/${id}`)
        // window.open(`${REACT_APP_CLAIM_URL}/${id}`, '_blank')
      }}
      title="Campaign’s Details"
      appearance='default'
    />
    <CampaignButton
      title='Share Link'
      onClick={() => copyToClipboard({ value: `${REACT_APP_CLAIM_URL}/${id}` })}
      appearance='default'
    />
      
  </Campaign>
}

export default CampaignComponent