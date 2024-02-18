import { RequestLoginType, ResultCodeEnum, authApi } from '@/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(`login`, async (data: RequestLoginType) => {
  return await authApi.login(data)
})

export const me = createAsyncThunk(`me`, async () => {
  const data = await authApi.me()

  if (data.resultCode === ResultCodeEnum.SUCCESS) {
    return data.data
  }
})

export const logout = createAsyncThunk(`logout`, async () => {
  return await authApi.logout()
})
