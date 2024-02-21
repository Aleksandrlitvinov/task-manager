import { useAppDispatch, useAppSelector } from '@/hooks'
import { changePage } from '@/redux'
import { Pagination } from '@mui/material'

import s from './pagination.module.scss'

export const TodosPagination = () => {
  const { currentPage, portion, todos } = useAppSelector(state => state.todoLists)
  const dispatch = useAppDispatch()
  const pagesCount = Math.ceil(todos.length / portion)

  const changeCurrentPage = (_: any, page: number) => {
    dispatch(changePage(page))
  }

  if (todos.length < 4) {
    return <></>
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
