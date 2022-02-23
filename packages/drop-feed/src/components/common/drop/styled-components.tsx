import styled, { css } from 'styled-components'
import { Button } from '../index'

export const Drop = styled.div`
  background-color: ${props => props.theme.blankColor};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 300px;
`
export const DropTitle = styled.h3`
  font-size: 16px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const DropDescription = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0;
`

type TDropImageProps = {
  address?: string
}

export const DropImage = styled.img<TDropImageProps>`
  height: 282px;
  object-fit: cover;
  object-position: 50%;

  ${props => props.address && css`
    border-radius: 8px;
    overflow: hidden;
    max-width: calc(100% - 32px);
    margin: 0 auto;
  `}
`

export const DropContent = styled.div`
  padding: 10px 16px 24px;
`

export const DropContract = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.primaryTextColor};

  span {
    color: ${props => props.theme.primaryHighlightColor};
  }
`

export const DropInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const DropTagsContainer = styled.div`
  div {
    margin-right: 4px;
    &:last-child {
      margin-right: 0px;
    }
  }
`

