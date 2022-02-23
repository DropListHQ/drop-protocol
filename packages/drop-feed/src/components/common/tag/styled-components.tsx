import styled, { css } from 'styled-components'

interface TagProps {
  status: 'error' | 'info' | 'default'
}


export const TagContainer = styled.div<TagProps>`
  padding: 4px 6px;
  display: inline-block;
  border-radius: 12px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  ${props => props.status === 'error' && css`
    background-color: ${props.theme.tagErrorColor};
    color: ${props.theme.secondaryTextColor};
  `}

  ${props => props.status === 'default' && css`
    background-color: ${props.theme.blankColor};
    color: ${props.theme.primaryTextColor};
    border: 1px solid ${props => props.theme.primaryBorderColor};
  `}

  ${props => props.status === 'info' && css`
    background-color: ${props.theme.tagInfoColor};
    color: ${props.theme.secondaryTextColor};
  `}
`