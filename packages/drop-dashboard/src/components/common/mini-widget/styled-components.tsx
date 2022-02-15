import styled from 'styled-components';
import Button from '../button'

const MiniWidget = styled.div`
  max-width: 300px;
  width: 100%;
  padding: 20px 14px 14px 20px;
  background-color: ${props => props.theme.blankColor};
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
`
const MiniWidgetTitle = styled.h2`
  color: ${props => props.theme.primaryTextColor};
  font-size: 24px;
  line-height: 36px;
  font-weight: 700;
  margin-bottom: 4px;
  margin-top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  svg {
    margin-right: 10px;
  }
`

const MiniWidgetDescription = styled.p`
  margin-top: 0;
  font-size: 12px;
  min-height: 50px;
  color: ${props => props.theme.noteTextColor};
`

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  
`

const ButtonComponent = styled(Button)`
  margin-right: 0px;
`

export {
  MiniWidget, MiniWidgetTitle, MiniWidgetDescription, Buttons, ButtonComponent
}
