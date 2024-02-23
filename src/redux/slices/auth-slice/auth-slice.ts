import { ResultCodeEnum } from '@/api'
import { login, logout, me } from '@/redux'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'

type AuthType = {
  isAuth: boolean
  isLoading: boolean
  login: null | string
}

const initialState: AuthType = {
  isAuth: false,
  isLoading: false,
  login: null,
}
const authSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.resultCode === ResultCodeEnum.SUCCESS) {
          state.isAuth = true
          state.isLoading = false
        }
      })
      .addCase(me.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuth = true
          state.login = action.payload.login
          state.isLoading = false
        }
        if (!action.payload) {
          state.isAuth = false
          state.login = null
          state.isLoading = false
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        if (action.payload.resultCode === ResultCodeEnum.SUCCESS) {
          state.isAuth = false
          state.isLoading = false
          state.login = null
        }
      })
      .addMatcher(isAnyOf(login.pending, logout.pending, me.pending), state => {
        state.isLoading = true
      })
  },
  initialState,
  name: 'auth',
  reducers: {},
})

export const authReducer = authSlice.reducer
