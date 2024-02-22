import React, { ChangeEvent, useState } from 'react'

import { Input } from '@/shared'
import { stylesAddItemForm, stylesBtnTask, stylesBtnTodo } from '@/styles'
import AddIcon from '@mui/icons-material/Add'
import { Button, ThemeProvider } from '@mui/material'

type AddItemFormPropsType = {
  callback: (todoTitle: string, id?: string) => void
  className: string
  placeholder: string
  stylesFor: 'task' | 'todo'
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const { callback, className, placeholder, stylesFor } = props
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const onInputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onValueChangeHandler = (todoTitle: string) => {
    setError(false)
    setInputValue(todoTitle)
  }
  const addItem = (e: React.FormEvent<HTMLFormElement>, itemTitle: string) => {
    e.preventDefault()
    if (itemTitle.trim() === '') {
      setError(true)
    } else {
      callback(itemTitle)
    }
    setInputValue('')
  }

  return (
    <form onSubmit={e => addItem(e, inputValue)}>
      <div className={className}>
        <ThemeProvider theme={stylesAddItemForm}>
          <Input
            error={error}
            onChange={onInputChangeValue}
            onValueChange={onValueChangeHandler}
            placeholder={placeholder}
            type={'text'}
            value={inputValue}
          />
        </ThemeProvider>
        <ThemeProvider theme={stylesFor === 'task' ? stylesBtnTask : stylesBtnTodo}>
          <Button disabled={inputValue === ''} type={'submit'} variant={'contained'}>
            <AddIcon />
          </Button>
        </ThemeProvider>
      </div>
    </form>
  )
}
