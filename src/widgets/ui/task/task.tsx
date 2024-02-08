import { useState } from 'react'

import { EditIcon, TrashIcon } from '@/assets'
import { Checkbox } from '@/components'
import { TaskType } from '@/types'

import s from './task.module.scss'
export const Task = (props: TaskType) => {
  const { isCompleted, title } = props
  const [isDone, setIsDone] = useState(isCompleted)
  const onChangeChecked = (value: boolean) => {
    setIsDone(!value)
  }

  return (
    <div className={s.task}>
      <Checkbox
        checked={isDone}
        label={title}
        onCheckedChange={() => onChangeChecked(isCompleted)}
      />
      <div className={s.icons}>
        <EditIcon />
        <TrashIcon className={s.icon} />
      </div>
    </div>
  )
}
