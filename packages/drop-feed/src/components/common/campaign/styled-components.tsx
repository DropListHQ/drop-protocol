import styled, { css } from 'styled-components'
import { Button } from '../index'

export const Campaign = styled.div`
  background-color: ${props => props.theme.blankColor};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  padding: 50px 27px 16px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`
export const CampaignTitle = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin: 0 0 24px;
`
export const CampaignImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  object-fit: cover;
  margin-bottom: 20px;
`

type TCampaignStatus = {
  status: string
}

export const CampaignStatus = styled.div<TCampaignStatus>`
  padding: 4px 16px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  font-weight: 700;
  border-bottom-left-radius: 8px;

  &::first-letter {
    text-transform: uppercase;
  }

  ${props => props.status === 'active' && css`
    background-color: ${props.theme.statusSuccessColor};
    color: ${props.theme.secondaryTextColor};
  `}

  ${props => props.status === 'stopped' && css`
    background-color: ${props.theme.statusStoppedColor};
    color: ${props.theme.primaryTextColor};
  `}
`

export const CampaignButton = styled(Button)`
  width: 152px;
  margin-bottom: 16px;
  min-height: 36px;
`