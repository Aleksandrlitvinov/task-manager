import React, { ChangeEvent, useEffect, useState } from 'react'

import { AddItemForm, TodosList, TodosPagination } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { createTodo, me } from '@/redux'
import { CircularProgress, ThemeProvider } from '@mui/material'

import s from './todos.module.scss'

import { stylesTodos } from './todos.styles'

export const TodosPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const isLoading = useAppSelector(state => state.auth.isLoading)
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

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  return (
    <div>
      <div className={s.content}>
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
        <div className={s.todos}>
          {isLoading ? (
            <div className={s.loader}>
              <CircularProgress color={'secondary'} />
            </div>
          ) : (
            <ThemeProvider theme={stylesTodos}>
              <TodosList />
            </ThemeProvider>
          )}
        </div>
        <TodosPagination />
      </div>
    </div>
  )
}
