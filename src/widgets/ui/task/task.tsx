import { useState } from 'react'

import { EditIcon, TrashIcon } from '@/assets'
import { Checkbox } from '@/components'
import { TaskTypeDTO } from '@/types'

import s from './task.module.scss'

type TestProps = {
  removeTask: (id: string) => void
}
export const Task = (props: TaskTypeDTO & TestProps) => {
  const { id, isCompleted, removeTask, title, ...rest } = props
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
        {...rest}
      />
      <div className={s.icons}>
        <EditIcon />
        <TrashIcon className={s.icon} onClick={() => removeTask(id)} />
      </div>
    </div>
  )
}
