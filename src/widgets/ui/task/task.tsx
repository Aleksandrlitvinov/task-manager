import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ModalRemove } from '@/components'
import { changeStatusAC } from '@/redux/slices/tasks-slice/tasksSlice'
import { TaskTypeDTO } from '@/types'
import { EditTitle } from '@/widgets'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Checkbox, Fab } from '@mui/material'
import clsx from 'clsx'

import s from './task.module.scss'

type TestProps = {
  onChangeTitle: (id: string, newTitle: string) => void
}
export const Task = (props: TaskTypeDTO & TestProps) => {
  const { id, isCompleted, onChangeTitle, title, ...rest } = props
  const [editMode, setEditMode] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const onChangeStatusHandler = (isDone: boolean) => {
    dispatch(changeStatusAC({ id, isDone }))
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
        <Fab
          aria-label={'delete'}
          className={s.icon}
          color={'error'}
          onClick={() => setShowModal(true)}
        >
          <DeleteForeverIcon />
        </Fab>
      </div>
      <ModalRemove handleClose={() => setShowModal(false)} id={id} open={showModal} title={title} />
    </div>
  )
}
