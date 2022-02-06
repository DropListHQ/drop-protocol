import styled from 'styled-components'
import TProps from './types'

export const TextComponent = styled.p<TProps>`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin: 0;
  color: ${props => props.theme.primaryTextColor};
`