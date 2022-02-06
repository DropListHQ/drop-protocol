import styled from 'styled-components'
import { Button, TokenImage } from 'components/common'

export const Title = styled.h2`
  font-size: 14px;
  line-height: 16px;
  margin-top: 16px;
  margin-bottom: 24px;
  text-align: center;
  color: ${props => props.theme.primaryTextColor};
  font-weight: 400;

  strong {
    font-weight: 700;
  }

  span {
    color: ${props => props.theme.primaryHighlightColor};
    font-weight: 700;
  }
`

type TScreenButton = {
  title: string,
  onClick: () => void
}

export const ScreenButton = styled(Button)<TScreenButton>`
  max-width: 270px;
  width: 100%;
`

export const TokenImageHuge = styled(TokenImage)`
  width: 340px;
  height: 340px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
`