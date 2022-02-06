import styled from 'styled-components'
import { ScreenLoader, Title, Text } from 'components/common'

export const Container = styled.div`
  padding-top: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

export const Loader = styled.div`
  margin-bottom: 40px;
  transform: rotate(30deg);
`

export const ScreenTitle = styled(Title)`
  margin-bottom: 30px;
`


export const ScreenSubtitle = styled(Text)`
  margin-bottom: 36px;
`


export const Link = styled.a`
  color: ${props => props.theme.primaryTextColor}
`