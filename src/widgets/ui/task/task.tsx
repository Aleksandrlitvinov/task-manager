import { ChangeEvent, useState } from 'react'

import { ModalRemove } from '@/components'
import { TaskTypeDTO } from '@/types'
import { EditTitle } from '@/widgets'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Checkbox, Fab } from '@mui/material'
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
  const [showModal, setShowModal] = useState<boolean>(false)
  const onChangeStatusHandler = (isDone: boolean) => {
    onChangeStatus(id, isDone)
  }

  const onEditModeHandler = () => {
    setEditMode(true)
  }

  const onViewMode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          label={'edit'}
          onViewMode={onViewMode}
          taskTitle={title}
          textVariant={'h2'}
        />
      </div>
      <div className={s.icons}>
        <Fab className={s.icon} color={'inherit'} onClick={onEditModeHandler}>
          <EditIcon />
        </Fab>
        <Fab aria-label={'delete'} className={s.icon} color={'error'}>
          <DeleteForeverIcon onClick={() => setShowModal(true)} />
        </Fab>
      </div>
      <ModalRemove
        handleClose={() => setShowModal(false)}
        id={id}
        open={showModal}
        removeItem={removeTask}
        title={title}
      />
    </div>
  )
}
