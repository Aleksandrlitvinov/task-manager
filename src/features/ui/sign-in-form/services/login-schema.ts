import * as z from 'zod'

import { PASSWORD_PATTERN } from './regex'

export const loginSchema = () => {
  return z.object({
    email: z.string().email({ message: 'incorrect email' }).trim(),
    password: z.string().min(6).max(20).regex(PASSWORD_PATTERN).trim(),
    rememberMe: z.boolean(),
  })
}

export type loginFormValuesType = z.infer<ReturnType<typeof loginSchema>>
