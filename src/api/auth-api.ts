import { ApiResponseType, LogoutResponseType, instance } from './api'

export const authApi = {
  login(data: RequestLoginType) {
    return instance
      .post<ApiResponseType<ResponseLoginType>>(`auth/login`, data)
      .then(res => res.data)
  },
  logout() {
    return instance.delete<LogoutResponseType>(`/auth/login`).then(res => res.data)
  },
  me() {
    return instance.get<ApiResponseType<ResponseMeType>>(`auth/me`).then(res => res.data)
  },
}

type ResponseLoginType = { userId: number }
type ResponseMeType = {
  email: string
  id: number
  login: string
}

export type RequestLoginType = {
  email: string
  password: string
  rememberMe?: boolean
}
