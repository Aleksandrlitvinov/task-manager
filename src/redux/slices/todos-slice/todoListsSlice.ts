import { RequestTodosType, RequestUpdateType, ResultCodeEnum, todosApi } from '@/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type FilterTasksType = 'active' | 'all' | 'completed'

type TodoType = {
  addedDate: string
  id: string
  order: number
  title: string
}

type TodoListsType = {
  filter: FilterTasksType
  isLoading: boolean
  todos: [] | TodoType[]
}

const initialState: TodoListsType = {
  filter: 'all',
  isLoading: false,
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
  reducers: {},
})

export const fetchTodos = createAsyncThunk(`getTodos`, async () => {
  return await todosApi.getTodos()
})
export const createTodo = createAsyncThunk(`addTodo`, async (data: RequestTodosType) => {
  return await todosApi.createTodo({ title: data.title })
})

export const removeTodo = createAsyncThunk(`removeTodo`, async (todoId: string) => {
  const data = await todosApi.removeTodo(todoId)

  if (data.resultCode === ResultCodeEnum.SUCCESS) {
    return todoId
  }
})

export const changeTodoTitle = createAsyncThunk(
  `changeTodoTitle`,
  async ({ title, todoId }: RequestUpdateType) => {
    await todosApi.updateTodoTitle({ title, todoId })

    return { title, todoId }
  }
)

export const todosSliceReducer = todoListsSlice.reducer
