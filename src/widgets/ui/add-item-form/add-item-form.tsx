import React, { ChangeEvent } from 'react'

import { Button, Input } from '@/components'

type AddItemFormPropsType = {
  addItem: (e: React.FormEvent<HTMLFormElement>, value: string) => void
  className: string
  error?: null | string
  inputValue: string
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  onValueChangeHandler: (taskTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const { addItem, className, error, inputValue, onChangeHandler, onValueChangeHandler } = props

  return (
    <form className={className} onSubmit={e => addItem(e, inputValue)}>
      <Input
        error={error}
        onChange={onChangeHandler}
        onValueChange={onValueChangeHandler}
        placeholder={'Enter task title'}
        type={'text'}
        value={inputValue}
      />
      <Button variant={'info'}>+</Button>
    </form>
  )
}
