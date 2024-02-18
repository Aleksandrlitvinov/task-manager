import { RequestTodosType, RequestUpdateType, ResultCodeEnum, todosApi } from '@/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(`getTodos`, async () => {
  return await todosApi.getTodos()
})
export const createTodo = createAsyncThunk(`addTodo`, async (data: RequestTodosType) => {
  return await todosApi.createTodo({ title: data.title })
})

export const removeTodo = createAsyncThunk(`removeTodo`, async (todoId: string) => {
  const data = await todosApi.removeTodo(todoId)

  if (data.resultCode === ResultCodeEnum.SUCCESS) {
    return todoId
  }
})

export const changeTodoTitle = createAsyncThunk(
  `changeTodoTitle`,
  async ({ title, todoId }: RequestUpdateType) => {
    await todosApi.updateTodoTitle({ title, todoId })

    return { title, todoId }
  }
)
