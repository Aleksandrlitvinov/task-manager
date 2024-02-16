import { ResponseApiType, instance } from '@/api/api'

export const authApi = {
  login(data: RequestLoginType) {
    return void instance
      .post<ResponseApiType<ResponseLoginType>>(`auth/login`, data)
      .then(res => console.log(res.data))
  },
  logout() {
    return void instance.delete(`/auth/login`).then(res => console.log(res.data))
  },
  me() {
    return void instance
      .get<ResponseApiType<ResponseMeType>>(`auth/me`)
      .then(res => console.log(res.data))
  },
}

type ResponseLoginType = { userId: number }
type ResponseMeType = {
  email: string
  id: number
  login: string
}

type RequestLoginType = {
  email: string
  password: string
  rememberMe?: boolean
}
