import { TodoType } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

type TodoListsType = {
  todoLists: [] | TodoType[]
}

const initialState: TodoListsType = {
  todoLists: [],
}

const todoListsSlice = createSlice({
  initialState,
  name: 'todoLists',
  reducers: {
    addTodoList: (state, action: PayloadAction<{ todoTitle: string }>) => {
      const newTodo = {
        id: uuidv4(),
        tasks: [],
        title: action.payload.todoTitle,
      }

      state.todoLists = [newTodo, ...state.todoLists]
    },
    changeTodoTitle: (state, action: PayloadAction<{ newTodoTitle: string; todoId: string }>) => {
      const currentTodo = state.todoLists.find(todo => todo.id === action.payload.todoId)

      if (currentTodo) {
        currentTodo.title = action.payload.newTodoTitle
      }

      state.todoLists = [...state.todoLists]
    },
    removeTodoList: (state, action: PayloadAction<{ todoId: string }>) => {
      state.todoLists = state.todoLists.filter(todo => todo.id !== action.payload.todoId)
    },
  },
})

export default todoListsSlice.reducer
export const { addTodoList, changeTodoTitle, removeTodoList } = todoListsSlice.actions
