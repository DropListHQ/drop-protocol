import styled from 'styled-components'
import { FramedIcon, Text, Button } from 'components/common'

export const FramedIconComponent = styled(FramedIcon)`
  margin-bottom: 64px;
`

export const TextComponent = styled(Text)`
  margin-bottom: 24px;
`

export const ButtonComponent = styled(Button)`
  width: 100%;
`


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  align-items: center;
  width: 100%;
  max-width: 270px;
`