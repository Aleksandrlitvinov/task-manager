import React, { ChangeEvent, useState } from 'react'

import { TodoType } from '@/types'
import { AddItemForm, TaskList } from '@/widgets'
import { v4 as uuidv4 } from 'uuid'

import s from './todos.module.scss'

export const TodosPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [todos, setTodos] = useState<TodoType[]>([])
  const [error, setError] = useState<null | string>(null)
  const onInputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onValueChangeHandler = (todoTitle: string) => {
    setError(null)
    setInputValue(todoTitle)
  }

  const addTodo = (e: React.FormEvent<HTMLFormElement>, todo: string) => {
    e.preventDefault()
    const newTodo = {
      id: uuidv4(),
      tasks: [],
      title: todo.toUpperCase(),
    }

    if (todo.trim() === '') {
      setError('title is required')
    } else {
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const onChangeTitle = (id: string, newTitle: string) => {
    const currentTodo = todos.find(t => t.id === id)

    if (currentTodo) {
      currentTodo.title = newTitle
    }

    setTodos([...todos])
  }

  return (
    <div>
      <main className={s.content}>
        <AddItemForm
          addItem={addTodo}
          className={s.form}
          error={error}
          inputValue={inputValue}
          onChangeHandler={onInputChangeValue}
          onValueChangeHandler={onValueChangeHandler}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          {todos.map(todo => (
            <TaskList
              id={todo.id}
              key={todo.id}
              onChangeTitle={onChangeTitle}
              tasks={todo.tasks}
              title={todo.title}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
