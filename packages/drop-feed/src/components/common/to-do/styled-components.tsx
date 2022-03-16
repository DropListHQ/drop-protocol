import styled, { css } from 'styled-components'

export const TodoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const TodoItem = styled.li`
  margin: 0 0 16px;
  display: flex;
  align-items: center;
`

type TTodoItemIndicator = {
  active: boolean
}

export const TodoItemIndicator = styled.div<TTodoItemIndicator>`
  width: 18px;
  height: 18px;
  background: ${props => props.theme.blankColor};
  border: 1px solid ${props => props.theme.primaryBorderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.active && css`
    background: ${props.theme.buttonActionBackgroundColor};
    border: none;
  `};
`

export const TodoItemTitle = styled.h4`
  
`