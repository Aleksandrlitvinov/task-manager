import React, { ChangeEvent, useState } from 'react'

import { ModalRemove } from '@/components'
import { useAppDispatch } from '@/hooks'
import { addTask, createTasksList } from '@/redux/slices/tasks-slice/tasksSlice'
import { FilterTasksType, changeTodoTitle } from '@/redux/slices/todos-slice/todoListsSlice'
import { AddItemForm, EditTitle, FilterTasks, TasksList } from '@/widgets'
import ClearIcon from '@mui/icons-material/Clear'
import { Fab, Paper } from '@mui/material'

import s from './todo.module.scss'

type PropsTaskListType = {
  id: string
  removeTodo: (id: string) => void
  title: string
}

export const Todo = (props: PropsTaskListType) => {
  const dispatch = useAppDispatch()
  const { id, removeTodo, title } = props
  const [filterTasks, setFilterTasks] = useState<FilterTasksType>('all')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const addNewTask = (e: React.FormEvent<HTMLFormElement>, taskTitle: string) => {
    e.preventDefault()
    if (taskTitle.trim() === '') {
      setError(true)
    } else {
      dispatch(createTasksList({ todoId: id }))
      dispatch(addTask({ newTaskTitle: taskTitle, todoId: id }))
    }

    setInputValue('')
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onValueChangeHandler = (taskTitle: string) => {
    setError(false)
    setInputValue(taskTitle)
  }
  const onClickSetFilterHandler = (value: string) => {
    const currentFilter = value.trim().toLowerCase()

    setFilterTasks(currentFilter as FilterTasksType)
  }

  const onEditModeHandler = () => setEditMode(true)

  const onChangeTitle = (id: string, newTitle: string) => {
    dispatch(changeTodoTitle({ newTodoTitle: newTitle, todoId: id }))
  }
  const onViewMode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeTitle(id, e.currentTarget.value)
    setEditMode(false)
  }

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
          <TasksList filter={filterTasks} todoId={id} />
        </div>
        <FilterTasks filter={filterTasks} onClickSetFilter={onClickSetFilterHandler} />
      </div>
    </Paper>
  )
}