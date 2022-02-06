import styled, { css } from 'styled-components'

export const buttonClass = 'WidgetButton'
type TWidget = {
  inverted?: boolean
}
export const Widget = styled.div<TWidget>`
  max-width: 230px;
  min-height: 288px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 50px 28px;
  align-items: center;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  background: ${props => props.theme.blankColor};
  color: ${props => props.theme.primaryTextColor};
  .${buttonClass} {
    color: ${props => props.theme.primaryTextColor};
  }
  ${props => props.inverted && css`
    color: ${props.theme.secondaryTextColor};
    background-color: ${props.theme.invertedCommunityColor};
    .${buttonClass} {
      color: ${props.theme.secondaryTextColor};
    }
  `}
`
export const WidgetImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  border-radius: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`

export const WidgetIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const WidgetTitle = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin: 0 0 6px;
`
export const WidgetText = styled.p`
  color: ${props => props.theme.noteTextColor};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  min-height: 42px;
  margin: 0 0 16px;
`
export const WidgetButton = styled.button`
  min-width: 152px;
  min-height: 36px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.primaryTextColor};
  border: 1px solid ${props => props.theme.primaryBorderColor};
  font-size: 12px;
  font-weight: 700;
  padding: 0 10px;
  border-radius: 20px;
  background-color: transparent;

  ${props => props.disabled && css`
    cursor: not-allowed;
    opacity: .3;
  `}
`

export const WidgetIconBlank = styled.div`
  width: 100%;
  height: 100%;
  background: pink;
`