
import { TodoItem, TodoList, ToDoButton, TodoItemIndicator, TodoItemControls } from './styled-components'
import Icons from 'icons'
import { FC } from 'react'

type TToDo = {
  title: string,
  id: string | number,
  finished: boolean,
  buttonTitle: string,
  onClick: () => void
}

type TProps = {
  data: TToDo[],
  className?: string
}

const TodoListComponent: FC<TProps> = ({
  data,
  className
}) => {
  const active: TToDo | undefined = data.find(item => !item.finished)
  return <TodoList className={className}>
    {data.map(item => <TodoItem>
      <TodoItemIndicator active={item.finished}>
        {
          item.finished &&
          active?.id !== item.id &&
          <Icons.CheckIcon />
        }
      </TodoItemIndicator>
      {item.title}
      {!item.finished && <TodoItemControls>
        <ToDoButton
          title={item.buttonTitle}
          disabled={active?.id !== item.id}
        />
      </TodoItemControls>}
    </TodoItem>)}
  </TodoList>
}


export default TodoListComponent