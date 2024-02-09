import React, { ChangeEvent, useState } from 'react'

import { Button, Input } from '@/components/ui'
import { TodoType } from '@/types'
import { TaskList } from '@/widgets'
import { v4 as uuidv4 } from 'uuid'

import s from './todos.module.scss'

export const TodosPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [todos, setTodos] = useState<TodoType[]>([])
  const onInputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const createTodo = (e: React.FormEvent<HTMLFormElement>, todo: string) => {
    e.preventDefault()
    const newTodo = {
      id: uuidv4(),
      tasks: [],
      title: todo.toUpperCase(),
    }

    if (todo === '') {
      alert('enter Todo title')
    } else {
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  return (
    <div>
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
