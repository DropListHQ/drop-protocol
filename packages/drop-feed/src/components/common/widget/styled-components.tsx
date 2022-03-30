import styled from 'styled-components'

export const WidgetComponent = styled.div`
  max-width: 460px;
  background: #FFFFFF;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  padding: 19px 16px 19px;
`
