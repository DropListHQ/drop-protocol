import styled, { css } from 'styled-components'

export const TodoItem = styled.li`
  margin: 0 0 16px;
`

type TTodoItemIndicator = {
  active: boolean
}

export const TodoItemIndicator = styled.div<TTodoItemIndicator>`
  width: 18px;
  height: 18px;
  ${props => props.active && css`
    background: ${props.theme.buttonActionBackgroundColor};
  `};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TodoItemTitle = styled.h4`
  
`