import { changeTodoTitle, createTodo, fetchTodos, removeTodo } from '@/redux'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type FilterTasksType = 'active' | 'all' | 'completed'

type TodoType = {
  addedDate: string
  id: string
  order: number
  title: string
}

type TodoListsType = {
  currentPage: number
  filter: FilterTasksType
  isLoading: boolean
  portion: number
  todos: [] | TodoType[]
}

const initialState: TodoListsType = {
  currentPage: 1,
  filter: 'all',
  isLoading: false,
  portion: 6,
  todos: [],
}

const todoListsSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = [...action.payload]
      state.isLoading = false
    })
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todos = [action.payload.data.item, ...state.todos]
    })
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    })
    builder.addCase(changeTodoTitle.fulfilled, (state, action) => {
      const currentTodoList = state.todos.find(todo => todo.id === action.payload.todoId)

      if (currentTodoList) {
        currentTodoList.title = action.payload.title
      }
    })
  },
  initialState,
  name: 'todos',
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const { changePage } = todoListsSlice.actions
export const todosSliceReducer = todoListsSlice.reducer
