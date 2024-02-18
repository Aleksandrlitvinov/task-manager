import { RequestLoginType, authApi } from '@/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(`login`, async (data: RequestLoginType) => {
  return await authApi.login(data)
})

export const me = createAsyncThunk(`me`, async () => {
  return await authApi.me()
})

export const logout = createAsyncThunk(`logout`, async () => {
  return await authApi.logout()
})
