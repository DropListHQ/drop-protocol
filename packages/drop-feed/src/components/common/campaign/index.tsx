import { FC, useState } from 'react'
import {
  Campaign,
  CampaignTitle,
  CampaignImage,
  CampaignDescription,
  CampaignContent,
  CampaignContract,
  CampaignInfo,
  CampaignLink,
  CampaignTagsContainer,
  CampaignOwner,
  CampaignOwnerInfo,
  CampaignOwnerTitle,
  CampaignCommunities,
  CampaignButtons,
  CampaignButton
} from './styled-components'
import { ICampaign } from 'types'
import { Tag, Userpic } from 'components/common'
import { defineNetworkName, shortenString } from 'helpers'

const { REACT_APP_CLAIM_URL } = process.env

const CampaignComponent: FC<ICampaign> = ({
  title,
  image,
  chain_id,
  short_description,
  campaign_address,
  owner,
  communities,
  prize
}) => {
  const [ imageURL, setImageURL ] = useState(image)
  // useEffect(() => {
  //   const defineImage = async () => {
  //     const image = await getValidImage(imageURL)
  //     if (image === imageURL) { return }
  //     console.log({ image })
  //     setImageURL(image)
  //   }
  //   defineImage()
  // }, [])
  return <Campaign>
    <CampaignOwner>
      <CampaignOwnerInfo>
        <Userpic src={owner.logo} alt={owner.name} />
        <CampaignOwnerTitle>{owner.name}</CampaignOwnerTitle>
      </CampaignOwnerInfo>
      <CampaignCommunities>
        {communities.map(community => <Userpic src={community.logo} alt={community.address} />)}  
      </CampaignCommunities>
    </CampaignOwner>
    <CampaignLink to={`/campaigns/${campaign_address}`}>
      <CampaignImage src={imageURL} alt={title} address={campaign_address} />
    </CampaignLink>
    <CampaignContent>
      <CampaignInfo>
        <CampaignContract>
          Contract: <span>{shortenString(campaign_address)}</span>
        </CampaignContract>
        <CampaignTagsContainer>
          <Tag title={defineNetworkName(chain_id)} status='default'/>
          <Tag title={prize.token_type.toUpperCase()} status='default'/>
        </CampaignTagsContainer>
      </CampaignInfo>
      <CampaignLink to={`/campaigns/${campaign_address}`}><CampaignTitle>{title}</CampaignTitle></CampaignLink>
      <CampaignDescription>{short_description}</CampaignDescription>
      <CampaignButtons>
        <CampaignLink to={`/campaigns/${campaign_address}`}><CampaignButton appearance='action' title='Participate' /></CampaignLink>
      </CampaignButtons>
    </CampaignContent>
  </Campaign>
}

export default CampaignComponent