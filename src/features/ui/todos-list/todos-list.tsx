import { memo, useCallback, useEffect } from 'react'

import { AddItemForm, Todo } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { createTodo, fetchTodos } from '@/redux'
import { TodoSkeleton, Typography } from '@/shared'
import { Grid } from '@mui/material'

import s from '@/pages/todos-page/todos.module.scss'

export const TodosList = memo(() => {
  const { currentPage, isLoading, portion, todos } = useAppSelector(state => state.todoLists)
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

  return (
    <div>
      <AddItemForm
        callback={addTodo}
        className={s.form}
        placeholder={'Add todo title'}
        stylesFor={'todo'}
      />
      {isLoading ? (
        <Grid container>
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <Grid item key={idx}>
                <TodoSkeleton />
              </Grid>
            ))}
        </Grid>
      ) : !todos ? (
        <Typography style={{ textAlign: 'center' }} variant={'large'}>
          Add your first Todo-List
        </Typography>
      ) : (
        <Grid container>
          {todosPerPage.map(todo => (
            <Grid item key={todo.id}>
              <Todo id={todo.id} title={todo.title} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
})
