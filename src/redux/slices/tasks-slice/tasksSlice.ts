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
          const currentTaskIdx = state[action.payload.todoListId].findIndex(
            (t: TaskType) => t.id === action.payload?.id
          )

          state[action.payload.todoListId].splice(currentTaskIdx, 1, action.payload)
        }
      })
  },
  initialState: {} as TasksState,
  name: 'tasks',
  reducers: {},
})

export const tasksSliceReducer = tasksSlice.reducer
