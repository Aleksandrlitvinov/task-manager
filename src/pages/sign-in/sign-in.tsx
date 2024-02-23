import { Navigate } from 'react-router-dom'

import { SignInForm } from '@/features'
import { useAppSelector } from '@/hooks'

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
