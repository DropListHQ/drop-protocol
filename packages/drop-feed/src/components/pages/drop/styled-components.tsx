import styled from 'styled-components'
import { Widget, ToDo, Timer, Button } from 'components/common'

export const Content = styled.div`
  display: flex;
`

export const RightColumn = styled.div`
  width: 300px;
`

export const LeftColumn = styled.div`
  flex: 1;
  padding-right: 20px;
`

export const DropWidget = styled(Widget)`
  margin-bottom: 24px;
  max-width: 100%;
`

export const WidgetTitle = styled.h4`
  font-size: 16px;
  margin: 0 0 16px;
  
`

export const DropToDo = styled(ToDo)`
  margin-top: 20px;
`

export const DropImage = styled.img`
  border-radius: 8px;
  height: 210px;
  width: 100%;
  object-fit: cover;
  display: block;
`

export const DropTimer = styled(Timer)`
  margin: 0 auto;
  transform: translateY(-50%);
`

export const Table = styled.div`
  margin-bottom: 10px;
  margin-bottom: 30px;
`

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
`

export const TableRowTitle = styled.h4`
  font-size: 14px;
  margin: 0;
  font-weight: 700;
  color: ${props => props.theme.noteTextColor};
`

export const TableRowValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.primaryTextColor};
`


export const DropButton = styled(Button)`
  max-width: 100%;
  width: 100%;
`