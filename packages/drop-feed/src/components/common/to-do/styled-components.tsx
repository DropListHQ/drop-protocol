import styled, { css } from 'styled-components'
import { Button } from 'components/common'

export const TodoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const TodoItem = styled.li`
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  min-height: 36px;
`

type TTodoItemIndicator = {
  active: boolean
}

export const TodoItemIndicator = styled.div<TTodoItemIndicator>`
  width: 16px;
  height: 16px;
  background: ${props => props.theme.blankColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  margin-right: 10px;
  border: 2px solid ${props => props.theme.primaryBorderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.active && css`
    background: ${props.theme.statusSuccessColor};
    border: none;
  `};
`

export const TodoItemTitle = styled.h4`
  margin: 0;
`

export const TodoItemControls = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export const ToDoButton = styled(Button)`
  width: 126px;
`