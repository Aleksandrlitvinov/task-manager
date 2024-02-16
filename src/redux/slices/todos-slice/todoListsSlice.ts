import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export type FilterTasksType = 'active' | 'all' | 'completed'

type TodoType = {
  filter: FilterTasksType
  id: string
  title: string
}

type TodoListsType = {
  todos: [] | TodoType[]
}

const initialState: TodoListsType = {
  todos: [],
}

const todoListsSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: {
    changeTodoTitle: (state, action: PayloadAction<{ newTodoTitle: string; todoId: string }>) => {
      const currentTodo = state.todos.find(todo => todo.id === action.payload.todoId)

      if (currentTodo) {
        currentTodo.title = action.payload.newTodoTitle
      }

      state.todos = [...state.todos]
    },
    createTodoList: (state, action: PayloadAction<{ todoTitle: string }>) => {
      const newTodo = {
        filter: 'all' as FilterTasksType,
        id: uuidv4(),
        title: action.payload.todoTitle,
      }

      state.todos = [newTodo, ...state.todos]
    },
    removeTodoList: (state, action: PayloadAction<{ todoId: string }>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.todoId)
    },
  },
})

export const todosSliceReducer = todoListsSlice.reducer
export const { changeTodoTitle, createTodoList, removeTodoList } = todoListsSlice.actions
