import s from './card.module.scss'

type PropsCardType = {
  title: string
}
export const Card = (props: PropsCardType) => {
  const { title } = props

  return <div className={s.cardWrapper}>{title}</div>
}
