import { instance } from '@/api/api'

export type ResponseCaptchaType = {
  url: string
}
export const securityApi = {
  fetchCaptchaURL() {
    return instance.get<ResponseCaptchaType>(`/security/get-captcha-url`).then(res => res.data)
  },
}
