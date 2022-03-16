
import { TodoItem, TodoList, TodoItemIndicator } from './styled-components'
import Icons from 'icons'
import { FC } from 'react'

type TProps = {
  data: { title: string, id: string | number, active: boolean }[],
  className?: string
}

const TodoListComponent: FC<TProps> = ({ data, className }) => {
  return <TodoList className={className}>
    {data.map(item => <TodoItem>
      <TodoItemIndicator active={item.active}>
          <Icons.CheckIcon />
      </TodoItemIndicator>
      {item.title}
    </TodoItem>)}
  </TodoList>
}


export default TodoListComponent