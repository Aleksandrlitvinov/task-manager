import { TaskType } from '@/api'
import { Task } from '@/features'
import { FilterTasksType } from '@/redux'

type TasksListProps = {
  filter: FilterTasksType
  tasks: TaskType[]
}

export const TasksList = (props: TasksListProps) => {
  const { filter, tasks } = props

  let tasksForTodo = tasks

  if (filter === 'active') {
    tasksForTodo = tasks.filter(t => !t.status)
  }
  if (filter === 'completed') {
    tasksForTodo = tasks.filter(t => t.status)
  }

  return <div>{tasksForTodo?.map((task: TaskType) => <Task item={task} key={task.id} />)}</div>
}
