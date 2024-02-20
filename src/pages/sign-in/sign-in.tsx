import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { SignInForm } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { me } from '@/redux'

import s from './sign-in.module.scss'

export const SignInPage = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  if (isAuth) {
    return <Navigate replace to={'/'} />
  }

  return (
    <div className={s.formWrapper}>
      <SignInForm />
    </div>
  )
}
