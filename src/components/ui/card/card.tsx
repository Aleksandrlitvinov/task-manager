import { ComponentPropsWithoutRef, ReactNode } from 'react'

import s from './card.module.scss'

type PropsCardType = {
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>
export const Card = (props: PropsCardType) => {
  const { children } = props

  return <div className={s.cardWrapper}>{children}</div>
}
