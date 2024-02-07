import { Header } from '@/components/ui'
import { TaskList } from '@/widgets'

import s from './home.module.scss'

export const HomePage = () => {
  return (
    <div>
      <Header />
      <main className={s.content}>
        <TaskList title={'First'} />
      </main>
    </div>
  )
}
