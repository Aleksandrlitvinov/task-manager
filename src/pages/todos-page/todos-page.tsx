import { TodosList, TodosPagination } from '@/features'
import { ThemeProvider } from '@mui/material'

import s from './todos.module.scss'

import { stylesTodos } from './todos.styles'

export const TodosPage = () => {
  return (
    <div>
      <div className={s.content}>
        <div className={s.todos}>
          <ThemeProvider theme={stylesTodos}>
            <TodosList />
          </ThemeProvider>
        </div>
        <TodosPagination />
      </div>
    </div>
  )
}
