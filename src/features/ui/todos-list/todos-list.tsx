import { memo, useCallback, useEffect } from 'react'

import { AddItemForm, Todo } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { createTodo, fetchTodos } from '@/redux'
import { Grid } from '@mui/material'

import s from '@/pages/todos/todos.module.scss'

export const TodosList = memo(() => {
  const { currentPage, portion, todos } = useAppSelector(state => state.todoLists)
  const dispatch = useAppDispatch()
  const todosPerPage = todos.slice((currentPage - 1) * portion, currentPage * portion)
  const addTodo = useCallback(
    async (todoTitle: string) => {
      await dispatch(createTodo({ title: todoTitle }))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  if (!todos.length) {
    return <div> You do not have any todos yet! Add your first TodoList</div>
  }

  return (
    <div>
      <AddItemForm
        callback={addTodo}
        className={s.form}
        placeholder={'Add todo title'}
        stylesFor={'todo'}
      />
      <Grid container>
        {todosPerPage.map(todo => (
          <Grid item key={todo.id}>
            <Todo id={todo.id} title={todo.title} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
})
