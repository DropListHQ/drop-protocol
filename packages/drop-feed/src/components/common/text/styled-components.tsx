import styled from 'styled-components'

export const TextComponent = styled.p`
  margin: 0 0 26px;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.primaryTextColor};

  span {
    font-weight: 700;
  }
`