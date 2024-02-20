import { Todo } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { removeTodo } from '@/redux'
import { TodoType } from '@/redux/slices/todos-slice/todos-types'
import { Grid } from '@mui/material'

type TodosListType = {
  currentPage: number
  portion: number
  todos: [] | TodoType[]
}

export const TodosList = (props: TodosListType) => {
  const { currentPage, portion, todos } = props
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(state => state.tasksList)
  const todosPaginated = todos.slice((currentPage - 1) * portion, currentPage * portion)

  const removeTodoList = async (id: string) => {
    await dispatch(removeTodo(id))
  }

  return (
    <Grid container>
      {todosPaginated.map(todo => (
        <Grid item key={todo.id}>
          <Todo
            id={todo.id}
            removeTodo={removeTodoList}
            tasks={tasks[todo.id]}
            title={todo.title}
          />
        </Grid>
      ))}
    </Grid>
  )
}
