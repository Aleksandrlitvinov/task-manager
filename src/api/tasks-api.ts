import { ApiResponseType, instance } from '@/api/api'
import { RequestUpdateType } from '@/api/todos-api'

export const tasksApi = {
  createNewTask({ title, todoId }: RequestUpdateType) {
    return instance
      .post<ApiResponseType<ResponseTaskType>>(`/todo-lists/${todoId}/tasks`, {
        title: title,
      })
      .then(res => res.data)
  },
  getTasksForTodo(todolistId: string) {
    return instance.get<FetchTasks>(`/todo-lists/${todolistId}/tasks`).then(res => res.data)
  },
  removeCurrentTask(taskId: string, todolistId: string) {
    return instance
      .delete<ApiResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
      .then(res => res.data)
  },
  updateTask(taskId: string, todolistId: string, taskData: TaskType) {
    return instance
      .put<ApiResponseType<ResponseTaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {
        ...taskData,
      })
      .then(res => res.data)
  },
}

export type ResponseTaskType = {
  item: TaskType
}

type FetchTasks = {
  error: string
  items: TaskType[]
  totalCount: number
}

export type TaskType = {
  addedDate: string
  deadline: string
  description: string
  id: string
  order: number
  priority?: number
  startDate: string
  status: TaskStatusEnum
  title: string
  todoListId: string
}

export enum TaskStatusEnum {
  COMPLETED = 1,
  PROGRESS = 0,
}
