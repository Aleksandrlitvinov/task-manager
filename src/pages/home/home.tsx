import { Header } from '@/components'

import s from './home.module.scss'

export const HomePage = () => {
  return (
    <div>
      <Header />
      <main className={s.content}></main>
    </div>
  )
}
