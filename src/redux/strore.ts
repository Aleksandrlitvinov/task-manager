import tasksSlice from '@/redux/slices/tasks-slice/tasksSlice'
import todoListsSlice from '@/redux/slices/todos-slice/todoListsSlice'
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: {
    tasksList: tasksSlice,
    todoLists: todoListsSlice,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
