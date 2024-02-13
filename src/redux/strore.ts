import tasksSlice from '@/redux/slices/tasks-slice/TasksSlice'
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: {
    tasksList: tasksSlice,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
