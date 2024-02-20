import { ChangeEvent, useState } from 'react'

import { ResponseTaskType, TaskStatusEnum, TaskType } from '@/api'
import { EditTitle } from '@/features'
import { useAppDispatch } from '@/hooks'
import { changeTodoTaskIsDone, getTodoTasks, removeTodoTask } from '@/redux'
import { ModalRemove } from '@/shared'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Checkbox, Fab, Tooltip } from '@mui/material'
import clsx from 'clsx'

import s from './task.module.scss'

export const Task = (props: ResponseTaskType) => {
  const { item: task } = props
  const [editMode, setEditMode] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const onChangeStatusHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked ? TaskStatusEnum.COMPLETED : TaskStatusEnum.PROGRESS
    const updatedTask: TaskType = {
      ...task,
      status: newStatus,
    }

    await dispatch(
      changeTodoTaskIsDone({ task: updatedTask, taskId: task.id, todoListId: task.todoListId })
    )

    dispatch(getTodoTasks(task.todoListId))
  }

  const onEditModeHandler = () => {
    setEditMode(true)
  }

  const onViewMode = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newTitle = e.currentTarget.value
    const updatedTask: TaskType = {
      ...task,
      title: newTitle,
    }

    await dispatch(
      changeTodoTaskIsDone({ task: updatedTask, taskId: task.id, todoListId: task.todoListId })
    )
    dispatch(getTodoTasks(task.todoListId))
    setEditMode(false)
  }

  const deleteTask = (taskId: string) => {
    dispatch(removeTodoTask({ taskId: taskId, todoListId: task.todoListId }))
  }

  return (
    <div className={clsx(s.task, task.status && s.isDone)}>
      <div className={s.taskTitle}>
        <Checkbox
          checked={!!task.status}
          color={'success'}
          onChange={e => onChangeStatusHandler(e)}
        />
        <EditTitle
          editMode={editMode}
          label={'edit'}
          onViewMode={onViewMode}
          taskTitle={task.title}
          textVariant={'h2'}
        />
      </div>
      <div className={s.icons}>
        <Tooltip placement={'top'} title={'Edit'}>
          <Fab className={s.icon} color={'inherit'} onClick={onEditModeHandler}>
            <EditIcon />
          </Fab>
        </Tooltip>
        <Tooltip placement={'top'} title={'Delete'}>
          <Fab className={s.icon} color={'inherit'} onClick={() => setShowModal(true)}>
            <DeleteForeverIcon />
          </Fab>
        </Tooltip>
      </div>
      <ModalRemove
        handleClose={() => setShowModal(false)}
        id={task.id}
        open={showModal}
        removeItem={deleteTask}
        title={task.title}
      />
    </div>
  )
}
