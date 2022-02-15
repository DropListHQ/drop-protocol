import styled from 'styled-components'

interface DataBlockProps {
  className?: string
}

export const DataBlockTitle = styled.h3`
  font-family: Inter;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.noteTextColor};
  margin: 0 0 8px;
`

export const DataBlockText = styled.p`
  font-family: Inter;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0;
`

export const DataBlock = styled.div.attrs(props => ({
  className: props.className
}))<DataBlockProps>`
  margin-bottom: 24px;
`

export const DataBlockLink = styled.a`
  color: ${props => props.theme.primaryTextColor};
  text-decoration: none;
  display: flex;
  align-items: center;
  svg {
    margin-left: 6px;
  }
`