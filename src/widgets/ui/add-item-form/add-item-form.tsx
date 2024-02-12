import React, { ChangeEvent } from 'react'

import { Input, stylesBtnTask, stylesBtnTodo } from '@/components'
import AddIcon from '@mui/icons-material/Add'
import { Button, ThemeProvider } from '@mui/material'

type AddItemFormPropsType = {
  addItem: (e: React.FormEvent<HTMLFormElement>, value: string) => void
  className: string
  error: null | string
  inputValue: string
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  onValueChangeHandler: (taskTitle: string) => void
  placeholder: string
  stylesFor: 'task' | 'todo'
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const {
    addItem,
    className,
    error,
    inputValue,
    onChangeHandler,
    onValueChangeHandler,
    placeholder,
    stylesFor,
  } = props

  return (
    <form onSubmit={e => addItem(e, inputValue)}>
      <div className={className}>
        <Input
          error={error}
          onChange={onChangeHandler}
          onValueChange={onValueChangeHandler}
          placeholder={placeholder}
          type={'text'}
          value={inputValue}
        />
        <ThemeProvider theme={stylesFor === 'task' ? stylesBtnTask : stylesBtnTodo}>
          <Button type={'submit'} variant={'contained'}>
            <AddIcon />
          </Button>
        </ThemeProvider>
      </div>
    </form>
  )
}
