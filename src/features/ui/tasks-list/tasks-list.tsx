import { memo } from 'react'

import { TaskType } from '@/api'
import { Task } from '@/features'
import { useAppSelector } from '@/hooks'
import { FilterTasksType } from '@/redux'
import { Typography } from '@/shared'

type TasksListProps = {
  filter: FilterTasksType
  todoId: string
  todoTitle: string
}

export const TasksList = memo((props: TasksListProps) => {
  const { filter, todoId, todoTitle } = props
  const tasks = useAppSelector(state => state.tasksList[todoId])

  let tasksForTodo = tasks

  if (filter === 'active') {
    tasksForTodo = tasks.filter(t => !t.status)
  }
  if (filter === 'completed') {
    tasksForTodo = tasks.filter(t => t.status)
  }

  return (
    <div>
      {!tasksForTodo?.length ? (
        <Typography style={{ textAlign: 'center' }} variant={'regularText16'}>
          Add your first task in {todoTitle}-todo
        </Typography>
      ) : (
        tasksForTodo?.map((task: TaskType) => <Task item={task} key={task.id} />)
      )}
    </div>
  )
})
