import { RequestLoginType, ResultCodeEnum, authApi } from '@/api'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

type AuthType = {
  isAuth: boolean
  isLoading: boolean
}

const initialState: AuthType = {
  isAuth: false,
  isLoading: false,
}
const authSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.resultCode === ResultCodeEnum.SUCCESS) {
        state.isAuth = true
        state.isLoading = false
      }
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      if (action.payload.resultCode === ResultCodeEnum.SUCCESS) {
        state.isAuth = false
        state.isLoading = false
      }
    })
    builder.addMatcher(isAnyOf(login.pending, logout.pending), state => {
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

export const logout = createAsyncThunk(`logout`, async () => {
  return await authApi.logout()
})

export const authReducer = authSlice.reducer
