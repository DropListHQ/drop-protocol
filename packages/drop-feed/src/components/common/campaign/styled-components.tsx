import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from 'components/common'

export const Campaign = styled.div`
  background-color: ${props => props.theme.blankColor};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 300px;
`
export const CampaignTitle = styled.h3`
  font-size: 16px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: flex-start;
  width: 100%;
`

export const CampaignLink = styled(Link)`
  text-decoration: none;
  display: flex;
  width: 100%;
`

export const CampaignDescription = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0;
`

type TCampaignImageProps = {
  address?: string
}

export const CampaignImage = styled.img<TCampaignImageProps>`
  height: 282px;
  object-fit: cover;
  object-position: 50%;

  ${props => props.address && css`
    border-radius: 8px;
    overflow: hidden;
    max-width: calc(100% - 32px);
    margin: 0 auto;
  `}
`

export const CampaignContent = styled.div`
  padding: 10px 16px 24px;
`

export const CampaignContract = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.primaryTextColor};

  span {
    color: ${props => props.theme.primaryHighlightColor};
  }
`

export const CampaignInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const CampaignTagsContainer = styled.div`
  div {
    margin-right: 4px;
    &:last-child {
      margin-right: 0px;
    }
  }
`
export const CampaignOwner = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  align-items: center;
`

export const CampaignOwnerInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 4px;
  }
`

export const CampaignOwnerTitle = styled.h5`
  margin: 0;
  font-weight: 700;
  font-size: 9px;
`

export const CampaignButtons = styled.div`
  display: flex;
  margin-top: 16px;
  width: 100%;
  justify-content: end;
  a {
    justify-content: end;
  }
`

export const CampaignCommunities = styled.div`
  display: flex;

  img {
    margin-right: -8px;
    &:last-child {
      margin-right: 0px;
    }
  }
`

export const CampaignButton = styled(Button)`
  min-width: 130px;
`