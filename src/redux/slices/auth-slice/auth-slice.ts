import { login, logout, me } from '@/redux'
import { getCaptchaUrl } from '@/redux/slices/auth-slice/authAsyncCreator'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'

type AuthType = {
  captchaUrl: null | string
  errorMessage: string
  isAuth: boolean
  isLoading: boolean
  login: null | string
  userId: null | number
}

const initialState: AuthType = {
  captchaUrl: null,
  errorMessage: '',
  isAuth: false,
  isLoading: false,
  login: null,
  userId: null,
}
const authSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
        state.captchaUrl = action.payload.url
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.userId) {
            state.isAuth = true
            state.isLoading = false
            state.userId = action.payload.userId
          }
          if (!action.payload.userId) {
            state.isAuth = false
            state.isLoading = false
          }
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.errorMessage = action.payload as string
        state.isLoading = false
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
      .addCase(me.rejected, (state, action) => {
        state.errorMessage = action.payload as string
        state.isLoading = false
      })
      .addCase(logout.fulfilled, state => {
        state.isAuth = false
        state.isLoading = false
        state.login = null
        state.errorMessage = ''
      })
      .addCase(logout.rejected, (state, action) => {
        state.errorMessage = action.payload as string
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
