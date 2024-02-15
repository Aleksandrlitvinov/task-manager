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
  tasksListsForTodos: {
    [todoId: string]: [] | TaskTypeDTO[]
  }
}

const initialState: TasksState = {
  tasksListsForTodos: {},
}

const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    addTask: (state, action: PayloadAction<{ newTaskTitle: string; todoId: string }>) => {
      const newTask = {
        id: uuidv4(),
        isCompleted: false,
        title: action.payload.newTaskTitle,
      }

      state.tasksListsForTodos[action.payload.todoId] = [
        newTask,
        ...state.tasksListsForTodos[action.payload.todoId],
      ]
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: string; isDone: boolean; todoId: string }>
    ) => {
      const currentTask = state.tasksListsForTodos[action.payload.todoId].find(
        t => t.id === action.payload.id
      )

      if (currentTask != null) {
        currentTask.isCompleted = action.payload.isDone
      }

      state.tasksListsForTodos[action.payload.todoId] = [
        ...state.tasksListsForTodos[action.payload.todoId],
      ]
    },
    changeTaskTitle: (
      state,
      action: PayloadAction<{ newTaskTitle: string; taskId: string; todoId: string }>
    ) => {
      const currentTask = state.tasksListsForTodos[action.payload.todoId].find(
        task => task.id === action.payload.taskId
      )

      if (currentTask) {
        currentTask.title = action.payload.newTaskTitle
      }

      state.tasksListsForTodos[action.payload.todoId] = [
        ...state.tasksListsForTodos[action.payload.todoId],
      ]
    },
    createTasksList: (state, action: PayloadAction<{ todoId: string }>) => {
      const newListForTodo = {
        [action.payload.todoId]: [],
      }

      state.tasksListsForTodos = { ...newListForTodo, ...state.tasksListsForTodos }
    },

    removeTask: (state, action: PayloadAction<{ taskId: string; todoId: string }>) => {
      state.tasksListsForTodos[action.payload.todoId] = state.tasksListsForTodos[
        action.payload.todoId
      ].filter((task: TaskTypeDTO) => task.id !== action.payload.taskId)
    },
  },
})

export const { addTask, changeStatus, changeTaskTitle, createTasksList, removeTask } =
  tasksSlice.actions
export default tasksSlice.reducer
