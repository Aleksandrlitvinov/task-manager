import { RequestLoginType, ResultCodeEnum, authApi, securityApi } from '@/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(`login`, async (data: RequestLoginType, { dispatch }) => {
  const loginData = await authApi.login(data)

  if (loginData.resultCode === ResultCodeEnum.CAPTCHA_IS_REQUIRED) {
    dispatch(getCaptchaUrl())

    return loginData.data
  } else {
    return loginData.data
  }
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

export const getCaptchaUrl = createAsyncThunk(`getCaptchaURL`, async () => {
  return await securityApi.fetchCaptchaURL()
})
