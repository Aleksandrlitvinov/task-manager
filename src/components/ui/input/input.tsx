import { ChangeEvent, ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './input.module.scss'

type InputPropsType = {
  onValueChange?: (value: string) => void
  type: 'text'
  value?: string
} & ComponentPropsWithoutRef<'input'>
export const Input = forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
  const { onValueChange, placeholder, type, value } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(e.target.value)
    }
  }

  return (
    <div className={s.inputWrapper}>
      <input
        className={s.input}
        onChange={onChangeHandler}
        placeholder={placeholder}
        ref={ref}
        type={type}
        value={value}
      />
    </div>
  )
})
