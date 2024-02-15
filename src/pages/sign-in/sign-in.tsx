import { SignInForm } from '@/widgets'

import s from './sign-in.module.scss'

export const SignInPage = () => {
  return (
    <div className={s.formWrapper}>
      <SignInForm />
    </div>
  )
}
