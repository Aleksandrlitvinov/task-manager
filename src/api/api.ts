import axios from 'axios'

export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  headers: {
    'API-KEY': '74f116d6-eb90-4cd2-9a7c-af3f94273bd1',
  },
  withCredentials: true,
})

export enum ResponseResultCodeEnum {
  ERROR = 1,
  SUCCESS = 0,
}

export type ResponseApiType<T> = {
  data: T
  messages: string[]
  resultCode: ResponseResultCodeEnum
}
