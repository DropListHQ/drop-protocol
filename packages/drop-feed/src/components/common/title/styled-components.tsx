import styled from 'styled-components'

export const TitleComponent = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  margin: 0 0 24px;
  color: ${props => props.theme.primaryTextColor}
`