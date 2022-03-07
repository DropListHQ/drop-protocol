import styled from 'styled-components'
import { Button, Text } from 'components/common'
import Icons from 'icons'

export const Title = styled.h2`
  font-size: 16px;
  color: ${props => props.theme.primaryTextColor};
  font-weight: 700;
  margin: 0 0 10px;
`

type TScreenButton = {
  title: string,
  onClick: () => void
}

export const ScreenButton = styled(Button)<TScreenButton>`
  max-width: 100%;
  width: 100%;
  margin-bottom: 16px;
`

export const TextComponent = styled(Text)`
  text-align: center;
  cursor: pointer;
`

export const IconComponent = styled(Icons.BlueArrowIcon)`
  vertical-align: middle;
  margin-left: 4px;
`

export const Description = styled.p`
  color: ${props => props.theme.primaryTextColor};
  font-size: 12px;
  margin: 0 0 26px;
`