import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/hooks'
import { SignInForm } from '@/widgets'

import s from './sign-in.module.scss'

export const SignInPage = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)

  if (isAuth) {
    return <Navigate replace to={'/'} />
  }

  return (
    <div className={s.formWrapper}>
      <SignInForm />
    </div>
  )
}
