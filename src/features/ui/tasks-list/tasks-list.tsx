import { memo } from 'react'

import { TaskType } from '@/api'
import { Task } from '@/features'
import { useAppSelector } from '@/hooks'
import { FilterTasksType } from '@/redux'

type TasksListProps = {
  filter: FilterTasksType
  todoId: string
}

export const TasksList = memo((props: TasksListProps) => {
  const { filter, todoId } = props
  const tasks = useAppSelector(state => state.tasksList[todoId])

  let tasksForTodo = tasks

  if (filter === 'active') {
    tasksForTodo = tasks.filter(t => !t.status)
  }
  if (filter === 'completed') {
    tasksForTodo = tasks.filter(t => t.status)
  }

  return <div>{tasksForTodo?.map((task: TaskType) => <Task item={task} key={task.id} />)}</div>
})
