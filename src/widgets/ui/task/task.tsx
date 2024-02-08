import { EditIcon, TrashIcon } from '@/assets'
import { Checkbox } from '@/components'
import { TaskType } from '@/db'

import s from './task.module.scss'
export const Task = (props: TaskType) => {
  const { title } = props

  return (
    <div className={s.task}>
      <Checkbox label={title} />
      <div className={s.icons}>
        <EditIcon />
        <TrashIcon className={s.icon} />
      </div>
    </div>
  )
}
