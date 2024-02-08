import { Outlet } from 'react-router-dom'

import { Header } from '@/components'

import s from './layout.module.scss'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={s.content}>
        <Outlet />
      </main>
    </>
  )
}