import { useEffect } from 'react'
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { SignInPage, TodosPage } from '@/pages'
import { me } from '@/redux'
import { Layout } from '@/shared'
import { CircularProgress } from '@mui/material'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/sign-in',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <TodosPage />,
    path: '/',
  },
]

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.auth.isLoading)

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  if (isLoading) {
    return <CircularProgress color={'secondary'} />
  }

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isAuth, isLoading } = useAppSelector(state => state.auth)

  if (isLoading) {
    return <CircularProgress color={'secondary'} />
  }

  return isAuth ? <Outlet /> : <Navigate to={'/sign-in'} />
}
