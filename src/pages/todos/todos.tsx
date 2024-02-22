import { useEffect } from 'react'

import { TodosList, TodosPagination } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { me } from '@/redux'
import { CircularProgress, ThemeProvider } from '@mui/material'

import s from './todos.module.scss'

import { stylesTodos } from './todos.styles'

export const TodosPage = () => {
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  return (
    <div>
      <div className={s.content}>
        <div className={s.todos}>
          {isLoading ? (
            <div className={s.loader}>
              <CircularProgress color={'secondary'} />
            </div>
          ) : (
            <ThemeProvider theme={stylesTodos}>
              <TodosList />
            </ThemeProvider>
          )}
        </div>
        <TodosPagination />
      </div>
    </div>
  )
}
