import React, { ChangeEvent, useState } from 'react'

import { Button, Header, Input } from '@/components/ui'
import { TodoType } from '@/types'
import { TaskList } from '@/widgets'

import s from './home.module.scss'

export const HomePage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [todos, setTodos] = useState<TodoType[]>([])
  const onInputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const createTodo = (e: React.FormEvent<HTMLFormElement>, todo: string) => {
    e.preventDefault()
    const newTodo = {
      id: 'a2dfe62b-ebce-4b37-9581-1cc77tbc9d9d',
      tasks: [],
      title: todo.toUpperCase(),
    }

    setTodos([...todos, newTodo])
    setInputValue('')
  }

  return (
    <div>
      <Header />
      <main className={s.content}>
        <form
          onSubmit={e => createTodo(e, inputValue)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 auto',
            padding: '10px 0 40px',
            width: '300px',
          }}
        >
          <Input
            onChange={onInputChangeValue}
            onValueChange={inputValue => setInputValue(inputValue)}
            placeholder={'Enter todo title'}
            type={'text'}
            value={inputValue}
          />
          <Button variant={'info'}>Add List</Button>
        </form>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          {todos.map(todo => (
            <TaskList key={todo.id} tasks={todo.tasks} title={todo.title} />
          ))}
        </div>
      </main>
    </div>
  )
}
