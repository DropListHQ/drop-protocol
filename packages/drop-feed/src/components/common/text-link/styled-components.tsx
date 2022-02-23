import styled from 'styled-components'

export const TextLink = styled.a`
  display: inline;
  color: ${props => props.theme.primaryHighlightColor};
  font-weight: 700;
  text-decoration: none;

  &:active, &:hover, &:visited {
    color: ${props => props.theme.primaryHighlightColor};
  }
`