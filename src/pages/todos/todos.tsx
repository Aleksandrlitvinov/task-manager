import React, { ChangeEvent, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { RootStateType, createTodo, fetchTodos, removeTodo } from '@/redux'
import { AddItemForm, Todo } from '@/widgets'
import { Grid, ThemeProvider } from '@mui/material'

import s from './todos.module.scss'

import { stylesTodos } from './todos.styles'

export const TodosPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const todos = useAppSelector((state: RootStateType) => state.todoLists.todos)
  const tasks = useAppSelector(state => state.tasksList)
  const dispatch = useAppDispatch()
  const onInputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onValueChangeHandler = (todoTitle: string) => {
    setError(false)
    setInputValue(todoTitle)
  }

  const addTodo = async (e: React.FormEvent<HTMLFormElement>, todoTitle: string) => {
    e.preventDefault()
    if (todoTitle.trim() === '') {
      setError(true)
    } else {
      await dispatch(createTodo({ title: todoTitle }))
      setInputValue('')
    }
  }
  const removeTodoList = async (id: string) => {
    await dispatch(removeTodo(id))
  }

  const getAllTasks = async () => {
    await dispatch(fetchTodos())
  }

  useEffect(() => {
    getAllTasks()
  }, [])

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
          placeholder={'Add todo title'}
          stylesFor={'todo'}
        />
        <ThemeProvider theme={stylesTodos}>
          <Grid container>
            {todos.map(todo => (
              <Grid item key={todo.id}>
                <Todo
                  id={todo.id}
                  removeTodo={removeTodoList}
                  tasks={tasks[todo.id]}
                  title={todo.title}
                />
              </Grid>
            ))}
          </Grid>
        </ThemeProvider>
      </main>
    </div>
  )
}
