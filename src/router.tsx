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
import { Layout, Loader } from '@/shared'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: '/sign-in-page',
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
    return <Loader />
  }

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isAuth, isLoading } = useAppSelector(state => state.auth)

  if (isLoading) {
    return <Loader />
  }

  return isAuth ? <Outlet /> : <Navigate to={'/sign-in-page'} />
}
