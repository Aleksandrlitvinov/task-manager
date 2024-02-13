import { ChangeEvent, ComponentPropsWithoutRef, forwardRef } from 'react'

import { TextField } from '@mui/material'
import clsx from 'clsx'

import s from './input.module.scss'

type InputPropsType = {
  error?: boolean
  onValueChange?: (value: string) => void
  type: 'text'
  value?: string
} & ComponentPropsWithoutRef<'input'>
export const Input = forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  const { error, onValueChange, placeholder, type, value } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(e.target.value)
    }
  }
  const classNames = {
    input: clsx(s.input, error && s.error),
  }

  return (
    <div className={s.inputWrapper}>
      <TextField
        className={classNames.input}
        error={error}
        onChange={onChangeHandler}
        placeholder={placeholder}
        ref={ref}
        type={type}
        value={value}
      />
      {error && <div className={s.errorMessage}>title is required</div>}
    </div>
  )
})
