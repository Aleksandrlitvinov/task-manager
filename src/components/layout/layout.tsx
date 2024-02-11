import { Outlet } from 'react-router-dom'

import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import s from './layout.module.scss'

export const Layout = () => {
  return (
    <>
      <AppBar position={'static'}>
        <Toolbar style={{ backgroundColor: 'var(--color-accent-700)' }}>
          <Typography color={'inherit'} component={'div'} sx={{ flexGrow: 1 }} variant={'h5'}>
            TASK MANAGER
          </Typography>
          <Button color={'inherit'} variant={'outlined'}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main className={s.content}>
        <Outlet />
      </main>
    </>
  )
}
