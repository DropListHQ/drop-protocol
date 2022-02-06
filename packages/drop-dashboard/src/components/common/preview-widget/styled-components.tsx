import styled from 'styled-components'
import { Widget } from 'components/common'
import { Button }  from 'components/common'

export const PreviewWidget = styled(Widget)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 38px 106px 60px;
  position: relative;
`

export const PreviewWidgetTitle = styled.h3`
  text-align: center;
  margin: 0 0 25px;
  max-width: 250px;
  font-size: 14px;
  font-weight: 700;
`

export const PreviewWidgetDescription = styled.p`
  max-width: 250px;
  font-size: 14px;
  margin: 0 0 12px;
  text-align: center;
`

export const PreviewWidgetImage = styled.img`
  width: 145px;
  height: 145px;
  border-radius: 7px;
  object-fit: cover;
  margin-bottom: 25px;
`

export const PreviewWidgetLabel = styled.div`
  padding: 4px 16px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  font-weight: 700;
  border-bottom-left-radius: 8px;
  background-color: ${props => props.theme.statusStoppedColor};
  color: ${props => props.theme.primaryTextColor};
  &::first-letter {
    text-transform: uppercase;
  }
`

export const PreviewWidgetButton = styled(Button)`
  width: 134px;
`

export const PreviewWidgetBlank = styled(PreviewWidgetImage)`
  background-color: ${props => props.theme.tagDefaultColor};
`