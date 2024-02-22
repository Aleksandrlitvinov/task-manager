import { TaskType } from '@/api'
import { createTaskForTodo, getTodoTasks, removeTodoTask, updateTodoTask } from '@/redux'
import { createSlice } from '@reduxjs/toolkit'

type TasksState = { [key: string]: TaskType[] }

const tasksSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(createTaskForTodo.fulfilled, (state, action) => {
        if (action.payload) {
          if (state[action.payload.todoListId]) {
            state[action.payload.todoListId] = [action.payload, ...state[action.payload.todoListId]]
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
      .addCase(updateTodoTask.fulfilled, (state, action) => {
        if (action.payload) {
          state[action.payload.todoListId] = state[action.payload.todoListId].map(task =>
            task.id === action.payload?.id ? { ...action.payload } : task
          )
        }
      })
  },
  initialState: {} as TasksState,
  name: 'tasks',
  reducers: {},
})

export const tasksSliceReducer = tasksSlice.reducer
