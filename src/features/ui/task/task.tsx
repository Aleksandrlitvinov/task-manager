import { ChangeEvent, memo, useCallback, useState } from 'react'

import { ResponseTaskType, TaskStatusEnum, TaskType } from '@/api'
import { EditTitle } from '@/features'
import { useAppDispatch } from '@/hooks'
import { removeTodoTask, updateTodoTask } from '@/redux'
import { ModalRemove } from '@/shared'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Checkbox, Fab, Tooltip } from '@mui/material'
import clsx from 'clsx'

import s from './task.module.scss'

export const Task = memo((props: ResponseTaskType) => {
  const { item: task } = props
  const [showModal, setShowModal] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const onUpdateStatusHandler = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const newStatus = e.currentTarget.checked ? TaskStatusEnum.COMPLETED : TaskStatusEnum.PROGRESS
      const updatedTask: TaskType = {
        ...task,
        status: newStatus,
      }

      await dispatch(
        updateTodoTask({ task: updatedTask, taskId: task.id, todoListId: task.todoListId })
      )
    },
    [dispatch, task]
  )

  const onChangeTaskTitle = useCallback(
    async (newTitle: string, id: string) => {
      const updatedTask: TaskType = {
        ...task,
        title: newTitle,
      }

      await dispatch(updateTodoTask({ task: updatedTask, taskId: id, todoListId: task.todoListId }))
    },
    [dispatch, task]
  )
  const deleteTask = (taskId: string) => {
    dispatch(removeTodoTask({ taskId: taskId, todoListId: task.todoListId }))
  }

  return (
    <div className={clsx(s.task, task.status && s.isDone)}>
      <div className={s.taskTitle}>
        <Checkbox
          checked={!!task.status}
          color={'success'}
          onChange={e => onUpdateStatusHandler(e)}
        />
        <EditTitle
          callback={onChangeTaskTitle}
          itemId={task.id}
          itemTitle={task.title}
          label={'edit'}
          textVariant={'h2'}
        />
      </div>
      <div className={s.icons}>
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
})
