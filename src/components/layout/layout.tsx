import { Outlet } from 'react-router-dom'

import { useAppDispatch } from '@/hooks'
import { logout } from '@/redux'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'

import s from './layout.module.scss'

export const Layout = () => {
  const dispatch = useAppDispatch()
  const signOut = async () => {
    await dispatch(logout()).unwrap()
  }

  return (
    <>
      <AppBar position={'static'} style={{ backgroundColor: 'var(--color-accent-700)' }}>
        <Container>
          <Toolbar>
            <Typography color={'inherit'} component={'div'} sx={{ flexGrow: 1 }} variant={'h5'}>
              TASK MANAGER
            </Typography>
            <Button color={'inherit'} onClick={signOut} variant={'outlined'}>
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <main className={s.content}>
          <Outlet />
        </main>
      </Container>
    </>
  )
}
