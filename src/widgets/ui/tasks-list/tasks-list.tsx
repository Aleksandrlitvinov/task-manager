import { useAppSelector } from '@/hooks'
import { FilterTasksType } from '@/redux'
import { TaskTypeDTO } from '@/types'
import { Task } from '@/widgets'

type TasksListProps = {
  filter: FilterTasksType
  todoId: string
}

export const TasksList = (props: TasksListProps) => {
  const { filter, todoId } = props
  const tasks = useAppSelector(state => state.tasksList.tasksListsForTodos)

  let tasksForTodo = tasks[todoId]

  if (filter === 'active') {
    tasksForTodo = tasks[todoId].filter(t => !t.isCompleted)
  }
  if (filter === 'completed') {
    tasksForTodo = tasks[todoId].filter(t => t.isCompleted)
  }

  return (
    <div>
      {tasksForTodo?.map((task: TaskTypeDTO) => (
        <Task
          id={task.id}
          isCompleted={task.isCompleted}
          key={task.id}
          onChangeTitle={() => {}}
          title={task.title}
          todoId={todoId}
        />
      ))}
    </div>
  )
}
