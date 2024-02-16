import { authReducer, tasksSliceReducer, todosSliceReducer } from '@/redux/slices'
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasksList: tasksSliceReducer,
    todoLists: todosSliceReducer,
  },
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
