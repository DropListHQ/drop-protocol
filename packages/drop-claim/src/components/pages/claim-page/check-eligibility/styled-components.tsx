import { Input, Button, Text} from 'components/common'
import styled from 'styled-components'

export const ScreenInput = styled(Input)`
  width: 100%;
`

export const ScreenButton = styled(Button)`
  width: 100%;
`

export const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  margin: 0 0 24px;
  line-height: 36px;
  color: ${props => props.theme.primaryTextColor};
`

export const Container = styled.div`
  width: 100%;
`

export const ScreenText = styled(Text)`
  margin-bottom: 24px;
`

export const BackButton = styled.div`
  color: ${props => props.theme.primaryHighlightColor};
  font-size: 14px;
  line-height: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 8px;

  svg {
    margin-right: 4px;
  }
`