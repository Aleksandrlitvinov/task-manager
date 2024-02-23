import { CircularProgress } from '@mui/material'

import s from './loader.module.scss'

export const Loader = () => {
  return (
    <div className={s.overlay}>
      <CircularProgress color={'secondary'} />
    </div>
  )
}
