import styled from 'styled-components'

export const WidgetContainer = styled.div`
  border: 1px solid ${props => props.theme.primaryBorderColor};
  background: ${props => props.theme.widgetColor};
  border-radius: 8px;
  overflow: hidden;
`


export const WidgetBody = styled.div`
  padding: 20px 18px 30px;
`