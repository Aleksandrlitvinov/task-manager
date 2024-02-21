import { useAppDispatch } from '@/hooks'
import { changePage } from '@/redux'
import { TodosType } from '@/redux/slices/todos-slice/todos-types'
import { Pagination } from '@mui/material'

import s from './pagination.module.scss'

type PaginationPropsType<T> = {
  currentPage: number
  portion: number
  todos: T
}

export const TodosPagination = ({
  currentPage,
  portion,
  todos,
}: PaginationPropsType<TodosType>) => {
  const dispatch = useAppDispatch()
  const pagesCount = Math.ceil(todos.length / portion)

  const changeCurrentPage = (_: any, page: number) => {
    dispatch(changePage(page))
  }

  return (
    <div className={s.pagination}>
      <Pagination
        color={'secondary'}
        count={pagesCount}
        onChange={changeCurrentPage}
        page={currentPage}
      />
    </div>
  )
}
