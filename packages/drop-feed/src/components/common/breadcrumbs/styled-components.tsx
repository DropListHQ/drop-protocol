import styled, { css } from 'styled-components'

export const BreadcrumbsComponent = styled.div`
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  align-items: start;
`
export const ReturnButton = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.primaryHighlightColor};
  cursor: pointer;
  width: auto;
  padding: 10px 10px 10px 0;

  svg {
    margin-right: 4px;
  }
`

type TTitle = {
  current?: boolean
}

export const Title = styled.h3<TTitle>`
  font-size: 24px;
  font-weight: 700;
  margin: 0 4px 0 0;
  color: ${props => props.theme.noteTextColor};

  ${props => props.current && css`
    color: ${props => props.theme.primaryTextColor};
  `}
`

export const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`

export const Description = styled.p`
  margin: 0;
  font-size: 16px;
  max-width: 520px;
`

