import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { me } from '@/redux'
import { SignInForm } from '@/widgets'

import s from './sign-in.module.scss'

export const SignInPage = () => {
  const dispatch = useAppDispatch()

  const isLogin = async () => {
    await dispatch(me())
  }

  useEffect(() => {
    void isLogin()
  }, [dispatch])

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
