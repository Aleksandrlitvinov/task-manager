import React, { ChangeEvent, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { RootStateType } from '@/redux'
import { createTodoList, removeTodoList } from '@/redux/slices/todos-slice/todoListsSlice'
import { AddItemForm, Todo } from '@/widgets'
import { Grid } from '@mui/material'

import s from './todos.module.scss'

export const TodosPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const todos = useAppSelector((state: RootStateType) => state.todoLists.todoLists)
  const dispatch = useAppDispatch()
  const onInputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onValueChangeHandler = (todoTitle: string) => {
    setError(false)
    setInputValue(todoTitle)
  }

  const addTodo = (e: React.FormEvent<HTMLFormElement>, todoTitle: string) => {
    e.preventDefault()
    if (todoTitle.trim() === '') {
      setError(true)
    } else {
      dispatch(createTodoList({ todoTitle: todoTitle }))
      setInputValue('')
    }
  }
  const removeTodo = (id: string) => {
    dispatch(removeTodoList({ todoId: id }))
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
          placeholder={'Add todo title'}
          stylesFor={'todo'}
        />
        <Grid container spacing={3}>
          {todos.map(todo => (
            <Grid item key={todo.id} style={{ width: '300px' }}>
              <Todo id={todo.id} removeTodo={removeTodo} title={todo.title} />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  )
}
