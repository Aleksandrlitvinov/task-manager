import { EditIcon, TrashIcon } from '@/assets'
import { Checkbox } from '@/components'
import { TaskTypeDTO } from '@/types'
import clsx from 'clsx'

import s from './task.module.scss'

type TestProps = {
  onChangeStatus: (id: string, isDone: boolean) => void
  removeTask: (id: string) => void
}
export const Task = (props: TaskTypeDTO & TestProps) => {
  const { id, isCompleted, onChangeStatus, removeTask, title, ...rest } = props
  const onChangeStatusHandler = (isDone: boolean) => {
    onChangeStatus(id, isDone)
  }

  return (
    <div className={clsx(s.task, isCompleted && s.isDone)}>
      <Checkbox
        checked={isCompleted}
        className={'checkboxFind'}
        label={title}
        onChange={() => onChangeStatusHandler(!isCompleted)}
        {...rest}
      />
      <div className={s.icons}>
        <EditIcon className={s.icon} />
        <TrashIcon className={s.icon} onClick={() => removeTask(id)} />
      </div>
    </div>
  )
}
