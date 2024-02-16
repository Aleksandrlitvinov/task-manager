import { RequestLoginType, ResultCodeEnum, authApi } from '@/api'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

type AuthType = {
  email: string
  isAuth: boolean
  isLoading: boolean
  login: string
  userId: null | number
}

const initialState: AuthType = {
  email: '',
  isAuth: false,
  isLoading: false,
  login: '',
  userId: null,
}
const authSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.resultCode === ResultCodeEnum.SUCCESS) {
        state.isAuth = true
        state.isLoading = false
      }
    })
    builder.addCase(me.fulfilled, (state, action) => {
      if (action.payload.resultCode === ResultCodeEnum.SUCCESS) {
        state.email = action.payload.data.email
        state.userId = action.payload.data.id
        state.login = action.payload.data.login
      }
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      if (action.payload.resultCode === ResultCodeEnum.SUCCESS) {
        state.isAuth = false
        state.isLoading = false
      }
    })
    builder.addMatcher(isAnyOf(login.pending, logout.pending, me.pending), state => {
      state.isLoading = true
    })
  },
  initialState,
  name: 'auth',
  reducers: {},
})

export const login = createAsyncThunk(`login`, async (data: RequestLoginType) => {
  return await authApi.login(data)
})

export const me = createAsyncThunk(`me`, async () => {
  return await authApi.me()
})

export const logout = createAsyncThunk(`logout`, async () => {
  return await authApi.logout()
})

export const authReducer = authSlice.reducer
