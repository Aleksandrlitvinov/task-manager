import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export type TaskTypeDTO = {
  addedDate?: string
  id: string
  isCompleted: boolean
  order?: number
  title: string
}

type TasksState = {
  tasks: [] | TaskTypeDTO[]
}

const initialState: TasksState = {
  tasks: [],
}

const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    addTaskAC: (state, action: PayloadAction<string>) => {
      const newTask = {
        addedDate: '2019-07-30T12:23:49.677',
        id: uuidv4(),
        isCompleted: false,
        order: 3,
        title: action.payload,
      }

      state.tasks = [newTask, ...state.tasks]
    },
    changeStatusAC: (state, action: PayloadAction<{ id: string; isDone: boolean }>) => {
      const currentTask = state.tasks.find(t => t.id === action.payload.id)

      if (currentTask != null) {
        currentTask.isCompleted = action.payload.isDone
      }

      state.tasks = [...state.tasks]
    },
    removeTaskAC: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task: TaskTypeDTO) => task.id !== action.payload)
    },
  },
})

export const { addTaskAC, changeStatusAC, removeTaskAC } = tasksSlice.actions
export default tasksSlice.reducer
