import { RequestUpdateType, ResultCodeEnum, TaskType, tasksApi } from '@/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getTodoTasks = createAsyncThunk(`getTasksForTodo`, async (todoListId: string) => {
  const data = await tasksApi.getTasksForTodo(todoListId)

  return { tasks: data.items, todoListId }
})

export const createTaskForTodo = createAsyncThunk(
  `addTask`,
  async ({ title, todoId }: RequestUpdateType) => {
    const data = await tasksApi.createNewTask({ title: title, todoId: todoId })

    if (data.resultCode === ResultCodeEnum.SUCCESS) {
      return data.data.item
    }
  }
)
export const removeTodoTask = createAsyncThunk(
  `removeTodoTask`,
  async ({ taskId, todoListId }: { taskId: string; todoListId: string }) => {
    await tasksApi.removeCurrentTask(taskId, todoListId)

    return { taskId, todoListId }
  }
)
export const updateTodoTask = createAsyncThunk(
  `changeIsDone`,
  async ({ task, taskId, todoListId }: { task: TaskType; taskId: string; todoListId: string }) => {
    const data = await tasksApi.updateTask(taskId, todoListId, task)

    if (data.resultCode === ResultCodeEnum.SUCCESS) {
      return data.data.item
    }
  }
)
