import { ApiResponseType, instance } from '@/api/api'

export const tasksApi = {
  createNewTask(title: string, todolistId: string) {
    instance
      .post<ApiResponseType<ResponseTaskType>>(`/todo-lists/${todolistId}/tasks`, { title: title })
      .then(res => res.data)
  },
  getTasksForTodo(todolistId: string) {
    instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`).then(res => res.data)
  },
  removeCurrentTask(taskId: string, todolistId: string) {
    instance
      .delete<ApiResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
      .then(res => res.data)
  },
  updateTask(taskId: string, todolistId: string, taskData: TaskType) {
    instance
      .put<ApiResponseType<ResponseTaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, taskData)
      .then(res => res.data)
  },
}

type TaskType = {
  addedDate: string
  completed: boolean
  deadline: string
  description: string
  id: string
  order: number
  priority?: number
  startDate: string
  status?: number
  title: string
  todoListId: string
  totalCount: number
}

type TasksType = {
  error: string
  items: TaskType[]
}

type ResponseTaskType = {
  item: TaskType
}
