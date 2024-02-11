import { ChangeEvent, useState } from 'react'

import { EditIcon, TrashIcon } from '@/assets'
//import {  CheckboxMui } from '@/components'
import { TaskTypeDTO } from '@/types'
import { EditTitle } from '@/widgets'
import { Checkbox } from '@mui/material'
import clsx from 'clsx'

import s from './task.module.scss'

type TestProps = {
  onChangeStatus: (id: string, isDone: boolean) => void
  onChangeTitle: (id: string, newTitle: string) => void
  removeTask: (id: string) => void
}
export const Task = (props: TaskTypeDTO & TestProps) => {
  const { id, isCompleted, onChangeStatus, onChangeTitle, removeTask, title, ...rest } = props
  const [editMode, setEditMode] = useState<boolean>(false)
  const onChangeStatusHandler = (isDone: boolean) => {
    onChangeStatus(id, isDone)
  }

  const onEditModeHandler = () => {
    setEditMode(true)
  }

  const onViewMode = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(id, e.currentTarget.value)
    setEditMode(false)
  }

  return (
    <div className={clsx(s.task, isCompleted && s.isDone)}>
      <div className={s.taskTitle}>
        <Checkbox
          checked={isCompleted}
          color={'success'}
          onChange={() => onChangeStatusHandler(!isCompleted)}
          {...rest}
        />
        <EditTitle
          editMode={editMode}
          onViewMode={onViewMode}
          taskTitle={title}
          textVariant={'regularText16'}
        />
      </div>
      <div className={s.icons}>
        <EditIcon className={s.icon} onClick={onEditModeHandler} />
        <TrashIcon className={s.icon} onClick={() => removeTask(id)} />
      </div>
    </div>
  )
}
