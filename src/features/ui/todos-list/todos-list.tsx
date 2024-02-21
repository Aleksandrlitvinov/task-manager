import { useEffect } from 'react'

import { Todo } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchTodos, removeTodo } from '@/redux'
import { Grid } from '@mui/material'

export const TodosList = () => {
  const { currentPage, portion, todos } = useAppSelector(state => state.todoLists)
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(state => state.tasksList)
  const todosPerPage = todos.slice((currentPage - 1) * portion, currentPage * portion)

  const removeTodoList = async (id: string) => {
    await dispatch(removeTodo(id))
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  if (!todos.length) {
    return <div> You do not have any todos yet! Add your first TodoList</div>
  }

  return (
    <Grid container>
      {todosPerPage.map(todo => (
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
