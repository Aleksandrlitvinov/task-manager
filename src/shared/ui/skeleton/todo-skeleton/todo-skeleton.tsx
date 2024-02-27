import { Paper, Skeleton } from '@mui/material'

import s from '@/features/ui/todo/todo.module.scss'

export const TodoSkeleton = () => {
  return (
    <Paper elevation={5} style={{ borderRadius: '10px' }}>
      <div className={s.tasksListWrapper}>
        <div className={s.icons}>
          <Skeleton height={15} variant={'circular'} width={15} />
        </div>
        <div className={s.tasksListTitle}>
          <Skeleton height={30} sx={{ fontSize: '1rem' }} variant={'text'} width={'30%'} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Skeleton height={50} width={'80%'} />
          <Skeleton height={50} width={'15%'} />
        </div>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
          }}
        >
          <Skeleton height={20} variant={'rectangular'} width={20} />
          <Skeleton height={30} width={'80%'} />
          <Skeleton height={30} variant={'circular'} width={30} />
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
          }}
        >
          <Skeleton height={20} variant={'rectangular'} width={20} />
          <Skeleton height={30} width={'80%'} />
          <Skeleton height={30} variant={'circular'} width={30} />
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
          }}
        >
          <Skeleton height={20} variant={'rectangular'} width={20} />
          <Skeleton height={30} width={'80%'} />
          <Skeleton height={30} variant={'circular'} width={30} />
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '25px',
          }}
        >
          <Skeleton height={20} variant={'rounded'} width={40} />
          <Skeleton height={20} variant={'rounded'} width={60} />
          <Skeleton height={20} variant={'rounded'} width={80} />
        </div>
      </div>
    </Paper>
  )
}
