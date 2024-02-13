import React, { ChangeEvent, useState } from 'react'

import { ModalRemove } from '@/components'
import { TaskTypeDTO } from '@/types'
import { AddItemForm, EditTitle, FilterTasks } from '@/widgets'
import { Task } from '@/widgets/ui/task'
import ClearIcon from '@mui/icons-material/Clear'
import { Fab, Paper } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

import s from './taskList.module.scss'

type PropsTaskListType = {
  id: string
  onChangeTitle: (id: string, newTitle: string) => void
  removeTasksList: (id: string) => void
  tasks: [] | TaskTypeDTO[]
  title: string
}

export type FilterTasksType = 'active' | 'all' | 'completed'

export const TaskList = (props: PropsTaskListType) => {
  const { id, onChangeTitle, removeTasksList, title } = props
  const [filterTasks, setFilterTasks] = useState<FilterTasksType>('all')
  const [tasksList, setTasksList] = useState<TaskTypeDTO[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const addTask = (e: React.FormEvent<HTMLFormElement>, taskTitle: string) => {
    e.preventDefault()
    const newTask = {
      addedDate: '2019-07-30T12:23:49.677',
      id: uuidv4(),
      isCompleted: false,
      order: 3,
      title: taskTitle,
    }

    if (taskTitle.trim() === '') {
      setError(true)
    } else {
      setTasksList([newTask, ...tasksList])
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

  let tasksForTodo = tasksList

  if (filterTasks === 'active') {
    tasksForTodo = tasksList.filter(t => !t.isCompleted)
  }
  if (filterTasks === 'completed') {
    tasksForTodo = tasksList.filter(t => t.isCompleted)
  }
  const onClickSetFilterHandler = (value: string) => {
    const currentFilter = value.trim().toLowerCase()

    setFilterTasks(currentFilter as FilterTasksType)
  }

  const onEditModeHandler = () => setEditMode(true)
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
          removeItem={removeTasksList}
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
          addItem={addTask}
          className={s.form}
          error={error}
          inputValue={inputValue}
          onChangeHandler={onChangeHandler}
          onValueChangeHandler={onValueChangeHandler}
          placeholder={'Add task title'}
          stylesFor={'task'}
        />
        <div className={s.tasksList}>
          {tasksForTodo.map(t => {
            const removeTask = (id: string) => {
              setTasksList(tasksList.filter(t => t.id !== id))
            }

            const onChangeStatus = (id: string, isDone: boolean) => {
              const currentTask = tasksList.find(t => t.id === id)

              if (currentTask != null) {
                currentTask.isCompleted = isDone
              }

              setTasksList([...tasksList])
            }

            const onChangeTitle = (id: string, newTitle: string) => {
              const currentTask = tasksList.find(t => t.id === id)

              if (currentTask) {
                currentTask.title = newTitle
              }

              setTasksList([...tasksList])
            }

            return (
              <Task
                id={t.id}
                isCompleted={t.isCompleted}
                key={t.id}
                onChangeStatus={onChangeStatus}
                onChangeTitle={onChangeTitle}
                removeTask={removeTask}
                title={t.title}
              />
            )
          })}
        </div>
        <FilterTasks filter={filterTasks} onClickSetFilter={onClickSetFilterHandler} />
      </div>
    </Paper>
  )
}
