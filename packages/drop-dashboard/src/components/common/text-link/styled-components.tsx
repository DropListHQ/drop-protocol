import styled from 'styled-components'

export const TextLink = styled.a`
  display: inline;
  color: ${props => props.theme.primaryHighlightColor};

  &:active, &:hover, &:visited {
    color: ${props => props.theme.primaryHighlightColor};
  }
`