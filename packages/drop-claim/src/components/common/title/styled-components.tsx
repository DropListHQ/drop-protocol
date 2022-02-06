import styled from 'styled-components'

import TProps from './types'

export const TitleComponent = styled.h2<TProps>`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  margin: 0;
  color: ${props => props.theme.primaryTextColor}
`