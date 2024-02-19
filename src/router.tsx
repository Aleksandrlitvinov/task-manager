import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useAppSelector } from '@/hooks'
import { SignInPage, TodosPage } from '@/pages'
import { Layout } from '@/shared'

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
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuth = useAppSelector(state => state.auth.isAuth)

  return isAuth ? <Outlet /> : <Navigate to={'/sign-in'} />
}
