import styled, { css } from 'styled-components'

interface TagProps {
  status: 'error' | 'info' | 'default'
}


export const TagContainer = styled.div<TagProps>`
  padding: 4px 8px;
  display: inline-block;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;


  ${props => props.status === 'error' && css`
    background-color: ${props.theme.tagErrorColor};
    color: ${props.theme.secondaryTextColor};
  `}

  ${props => props.status === 'default' && css`
    background-color: ${props.theme.tagDefaultColor};
    color: ${props.theme.primaryTextColor};
  `}

  ${props => props.status === 'info' && css`
    background-color: ${props.theme.tagInfoColor};
    color: ${props.theme.secondaryTextColor};
  `}
`