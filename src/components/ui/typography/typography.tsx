import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'
type TypographyPropsType<T extends ElementType = 'p'> = {
  as?: T
  children?: ReactNode
  className?: string
  variant?:
    | 'boldText14'
    | 'boldText16'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'mediumText14'
    | 'regularText14'
    | 'regularText16'
}
export const Typography = <T extends ElementType = 'p'>(
  props: TypographyPropsType & Omit<ComponentPropsWithoutRef<T>, keyof TypographyPropsType<T>>
) => {
  const { as: Component = 'p', className, variant = 'regularText16', ...rest } = props

  return <Component className={clsx(s[variant], className)} {...rest} />
}
