import { RequestLoginType, ResultCodeEnum, authApi, securityApi } from '@/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  `login`,
  async (data: RequestLoginType, { dispatch, rejectWithValue }) => {
    try {
      const loginData = await authApi.login(data)

      if (loginData.resultCode === ResultCodeEnum.SUCCESS) {
        return loginData.data
      }
      if (loginData.resultCode === ResultCodeEnum.ERROR) {
        throw new Error(loginData.messages[0])
      }
      if (loginData.resultCode === ResultCodeEnum.CAPTCHA_IS_REQUIRED) {
        dispatch(getCaptchaUrl())

        return loginData.data
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(e.message)
      }
    }
  }
)

export const me = createAsyncThunk(`me`, async (_, { rejectWithValue }) => {
  try {
    const data = await authApi.me()

    if (data.resultCode === ResultCodeEnum.SUCCESS) {
      return data.data
    }
    if (data.resultCode === ResultCodeEnum.ERROR) {
      throw new Error(data.messages[0])
    }
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e.message)
    }
  }
})

export const logout = createAsyncThunk(`logout`, async () => {
  return await authApi.logout()
})

export const getCaptchaUrl = createAsyncThunk(`getCaptchaURL`, async () => {
  return await securityApi.fetchCaptchaURL()
})
