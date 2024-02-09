import { ChangeEvent, ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './input.module.scss'

type InputPropsType = {
  error?: null | string
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
      <input
        className={classNames.input}
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
