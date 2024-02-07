import { Card, Typography } from '@/components'
import { Task, TaskType } from '@/widgets/ui/task/task'

import s from './taskList.module.scss'

const TASKS: TaskType[] = [
  {
    addedDate: '2019-07-30T12:23:49.677',
    id: 'a2dfe62b-ebce-4b37-9581-1cc77ebc999f',
    order: 0,
    title: 'not important',
  },
  {
    addedDate: '2019-07-30T12:23:49.677',
    id: 'a2dfe62b-ebce-4b37-9581-1cc77ebc9d9f',
    order: 0,
    title: 'important',
  },
]

type PropsTaskListType = {
  title: string
}

export const TaskList = (props: PropsTaskListType) => {
  const { title } = props

  return (
    <Card>
      <Typography className={s.title} variant={'h2'}>
        {title}
      </Typography>
      <div>
        {TASKS.map(t => (
          <Task key={t.id} title={t.title} />
        ))}
      </div>
    </Card>
  )
}
