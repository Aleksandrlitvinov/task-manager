import { memo, useCallback, useEffect, useState } from 'react'

import { AddItemForm, EditTitle, FilterTasks, TasksList } from '@/features'
import { useAppDispatch } from '@/hooks'
import {
  FilterTasksType,
  changeTodoTitle,
  createTaskForTodo,
  getTodoTasks,
  removeTodo,
} from '@/redux'
import { ModalRemove } from '@/shared'
import ClearIcon from '@mui/icons-material/Clear'
import { Fab, Paper } from '@mui/material'

import s from './todo.module.scss'

type PropsTaskListType = {
  id: string
  title: string
}

export const Todo = memo((props: PropsTaskListType) => {
  const dispatch = useAppDispatch()
  const { id, title } = props
  const [filterTasks, setFilterTasks] = useState<FilterTasksType>('all')
  const [showModal, setShowModal] = useState<boolean>(false)

  const addNewTask = useCallback(
    (taskTitle: string) => {
      dispatch(createTaskForTodo({ title: taskTitle, todoId: id }))
    },
    [dispatch, id]
  )
  const onClickSetFilterHandler = (value: string) => {
    const currentFilter = value.trim()

    setFilterTasks(currentFilter as FilterTasksType)
  }

  const onChangeTitle = useCallback(
    async (newTitle: string, id: string) => {
      await dispatch(changeTodoTitle({ title: newTitle, todoId: id }))
    },
    [dispatch]
  )
  const removeTodoList = useCallback(
    async (id: string) => {
      await dispatch(removeTodo(id))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(getTodoTasks(id))
  }, [dispatch, id])

  return (
    <Paper elevation={5} style={{ borderRadius: '10px' }}>
      <div className={s.tasksListWrapper}>
        <div className={s.icons}>
          <Fab aria-label={'delete'} className={s.icon} onClick={() => setShowModal(true)}>
            <ClearIcon />
          </Fab>
        </div>
        <ModalRemove
          handleClose={() => setShowModal(false)}
          id={id}
          open={showModal}
          removeItem={removeTodoList}
          title={title}
        />

        <div className={s.tasksListTitle}>
          <EditTitle
            callback={onChangeTitle}
            itemId={id}
            itemTitle={title}
            label={'edit'}
            textVariant={'h2'}
          />
        </div>

        <AddItemForm
          callback={addNewTask}
          className={s.form}
          placeholder={'task title'}
          stylesFor={'task'}
        />
        <div className={s.tasksList}>
          <TasksList filter={filterTasks} todoId={id} />
        </div>
        <FilterTasks filter={filterTasks} onClickSetFilter={onClickSetFilterHandler} />
      </div>
    </Paper>
  )
})
