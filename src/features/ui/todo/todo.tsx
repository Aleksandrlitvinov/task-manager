import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { TaskType } from '@/api'
import { AddItemForm, EditTitle, FilterTasks, TasksList } from '@/features'
import { useAppDispatch } from '@/hooks'
import { FilterTasksType, changeTodoTitle, createTaskForTodo, getTodoTasks } from '@/redux'
import { ModalRemove } from '@/shared'
import ClearIcon from '@mui/icons-material/Clear'
import { Fab, Paper, Tooltip } from '@mui/material'

import s from './todo.module.scss'

type PropsTaskListType = {
  id: string
  removeTodo: (id: string) => void
  tasks: TaskType[]
  title: string
}

export const Todo = (props: PropsTaskListType) => {
  const dispatch = useAppDispatch()
  const { id, removeTodo, tasks, title } = props
  const [filterTasks, setFilterTasks] = useState<FilterTasksType>('all')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const addNewTask = useCallback(
    (e: React.FormEvent<HTMLFormElement>, taskTitle: string) => {
      e.preventDefault()
      if (taskTitle.trim() === '') {
        setError(true)
      } else {
        dispatch(createTaskForTodo({ title: taskTitle, todoId: id }))
      }

      setInputValue('')
    },
    [dispatch, id]
  )
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onValueChangeHandler = (taskTitle: string) => {
    setError(false)
    setInputValue(taskTitle)
  }
  const onClickSetFilterHandler = (value: string) => {
    const currentFilter = value.trim()

    setFilterTasks(currentFilter as FilterTasksType)
  }

  const onEditModeHandler = () => setEditMode(true)

  const onChangeTitle = async (id: string, newTitle: string) => {
    await dispatch(changeTodoTitle({ title: newTitle, todoId: id }))
  }
  const onViewMode = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    await onChangeTitle(id, e.currentTarget.value)
    setEditMode(false)
  }

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
          removeItem={removeTodo}
          title={title}
        />
        <Tooltip placement={'top-start'} title={'double-click to edit'}>
          <div className={s.tasksListTitle}>
            <EditTitle
              editMode={editMode}
              label={'edit'}
              onEditMode={onEditModeHandler}
              onViewMode={onViewMode}
              taskTitle={title}
              textVariant={'h2'}
            />
          </div>
        </Tooltip>
        <AddItemForm
          addItem={addNewTask}
          className={s.form}
          error={error}
          inputValue={inputValue}
          onChangeHandler={onChangeHandler}
          onValueChangeHandler={onValueChangeHandler}
          placeholder={'Add task title'}
          stylesFor={'task'}
        />
        <div className={s.tasksList}>
          <TasksList filter={filterTasks} tasks={tasks} />
        </div>
        <FilterTasks filter={filterTasks} onClickSetFilter={onClickSetFilterHandler} />
      </div>
    </Paper>
  )
}
