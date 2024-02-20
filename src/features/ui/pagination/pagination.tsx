import { useAppDispatch, useAppSelector } from '@/hooks'
import { changePage } from '@/redux'
import { Pagination } from '@mui/material'

import s from './pagination.module.scss'

export const TodosPagination = () => {
  const dispatch = useAppDispatch()
  const { currentPage, portion, todos } = useAppSelector(state => state.todoLists)
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
