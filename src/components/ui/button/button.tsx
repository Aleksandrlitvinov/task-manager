import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

type ButtonPropsType<T extends ElementType = 'button'> = {
  as?: T
  children?: string
  className?: string
  variant: 'danger' | 'info' | 'success' | 'warning'
} & ComponentPropsWithoutRef<'button'>
export const Button = <T extends ElementType = 'button'>(props: ButtonPropsType<T>) => {
  const { as: Component = 'button', children, variant = 'success', ...rest } = props

  return (
    <Component className={clsx(s[variant])} {...rest}>
      {children}
    </Component>
  )
}
