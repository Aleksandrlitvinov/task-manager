import { memo, useEffect } from 'react'

import { Todo } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchTodos } from '@/redux'
import { Grid } from '@mui/material'

export const TodosList = memo(() => {
  const { currentPage, portion, todos } = useAppSelector(state => state.todoLists)
  const dispatch = useAppDispatch()
  const todosPerPage = todos.slice((currentPage - 1) * portion, currentPage * portion)

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
          <Todo id={todo.id} title={todo.title} />
        </Grid>
      ))}
    </Grid>
  )
})
