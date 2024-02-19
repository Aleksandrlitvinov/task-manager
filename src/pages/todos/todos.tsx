import React, { ChangeEvent, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { changePage, createTodo, fetchTodos, removeTodo } from '@/redux'
import { AddItemForm, Todo } from '@/widgets'
import { Grid, Pagination, ThemeProvider } from '@mui/material'

import s from './todos.module.scss'

import { stylesTodos } from './todos.styles'

export const TodosPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const { currentPage, portion, todos } = useAppSelector(state => state.todoLists)
  const tasks = useAppSelector(state => state.tasksList)
  const dispatch = useAppDispatch()
  const pagesCount = Math.ceil(todos.length / portion)

  const todosPaginated = todos.slice((currentPage - 1) * portion, currentPage * portion)

  const changeCurrentPage = (_: any, page: number) => {
    dispatch(changePage(page))
  }

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
        <ThemeProvider theme={stylesTodos}>
          {!todos.length ? (
            <div> You do not have any todos yet! Add your first TodoList</div>
          ) : (
            <Grid container>
              {todosPaginated.map(todo => (
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
          )}
        </ThemeProvider>
      </div>
      {todos.length > 4 && (
        <div className={s.pagination}>
          <Pagination
            color={'secondary'}
            count={pagesCount}
            onChange={changeCurrentPage}
            page={currentPage}
          />
        </div>
      )}
    </div>
  )
}
