import { Checkbox } from '@/components'

import s from './task.module.scss'

export type TaskType = {
  addedDate?: string
  id?: string
  order?: number
  title: string
}

export const Task = (props: TaskType) => {
  const { title } = props

  return (
    <div className={s.task}>
      <Checkbox label={title} />
    </div>
  )
}
