import { ApiResponseType, instance } from './api'

export const todosApi = {
  createTodo(data: RequestTodosType) {
    return instance
      .post<ApiResponseType<ResponseTodosType>>(`/todo-lists`, data)
      .then(res => res.data)
  },
  getTodos() {
    return instance.get<ResponseTodoListItem[]>(`/todo-lists`).then(res => res.data)
  },
  removeTodo(todoId: string) {
    return instance.delete<ApiResponseType>(`/todo-lists/${todoId}`).then(res => res.data)
  },
  updateTodoTitle({ title, todoId }: RequestUpdateType) {
    return instance.put(`/todo-lists/${todoId}`, { title: title }).then(res => res.data)
  },
}

type ResponseTodosType = {
  item: ResponseTodoListItem
}

type ResponseTodoListItem = {
  addedDate: string
  id: string
  order: number
  title: string
}

export type RequestTodosType = {
  title: string
}

export type RequestUpdateType = {
  title: string
  todoId: string
}
