import { ChangeEvent, useState } from 'react'

import { Button, Header, Input } from '@/components/ui'
import { TODOS } from '@/db'
import { TaskList } from '@/widgets'

import s from './home.module.scss'

export const HomePage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const onInputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <Header />
      <main className={s.content}>
        <form
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0 10px',
            width: '300px',
          }}
        >
          <Input
            onChange={onInputChangeValue}
            onValueChange={inputValue => setInputValue(inputValue)}
            type={'text'}
            value={inputValue}
          />
          <Button variant={'info'}>Add List</Button>
        </form>
        <div>
          {TODOS.map(todo => (
            <TaskList key={todo.id} title={todo.title} />
          ))}
        </div>
      </main>
    </div>
  )
}
