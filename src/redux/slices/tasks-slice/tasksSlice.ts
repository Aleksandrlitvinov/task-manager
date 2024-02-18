import { RequestUpdateType, ResultCodeEnum, TaskType, tasksApi } from '@/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type TasksState = { [key: string]: TaskType[] }

const tasksSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(createTaskForTodo.fulfilled, (state, action) => {
        if (action.payload) {
          if (state[action.payload.todoListId]) {
            state[action.payload.todoListId].push(action.payload)
          }
          if (!state[action.payload.todoListId]) {
            state[action.payload.todoListId] = [action.payload]
          }
        }
      })
      .addCase(getTodoTasks.fulfilled, (state, action) => {
        state[action.payload.todoListId] = action.payload.tasks
      })
      .addCase(removeTodoTask.fulfilled, (state, action) => {
        state[action.payload.todoListId] = state[action.payload.todoListId].filter(
          (task: TaskType) => task.id !== action.payload.taskId
        )
      })
      .addCase(changeTodoTaskIsDone.fulfilled, (state, action) => {
        if (action.payload) {
          const currentTask = state[action.payload.todoListId].find(
            (t: TaskType) => t.id === action.payload?.id
          )

          if (currentTask) {
            currentTask.status = action.payload.status
          }
        }
      })
  },
  initialState: {} as TasksState,
  name: 'tasks',
  reducers: {},
})

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
export const changeTodoTaskIsDone = createAsyncThunk(
  `changeIsDone`,
  async ({ task, taskId, todoListId }: { task: TaskType; taskId: string; todoListId: string }) => {
    const data = await tasksApi.updateTask(taskId, todoListId, task)

    if (data.resultCode === ResultCodeEnum.SUCCESS) {
      return data.data.item
    }
  }
)
export const tasksSliceReducer = tasksSlice.reducer
