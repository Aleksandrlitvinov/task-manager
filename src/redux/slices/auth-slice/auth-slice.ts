import { RequestLoginType, authApi } from '@/api'
import { baseURL } from '@/api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type AuthType = {
  isAuth: boolean
}

const initialState: AuthType = {
  isAuth: false,
}
const authSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.data.userId) {
        state.isAuth = true
      }
    })
  },
  initialState,
  name: 'auth',
  reducers: {},
})

export const login = createAsyncThunk(baseURL, async (data: RequestLoginType) => {
  return await authApi.login(data)
})

export const authReducer = authSlice.reducer
