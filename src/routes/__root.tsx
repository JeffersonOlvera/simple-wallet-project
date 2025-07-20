import { Outlet,createRootRoute, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Notifications } from '@mantine/notifications'
import TanstackQueryLayout from '../integrations/tanstack-query/layout'
import { Notifications } from '@mantine/notifications'

import { Header } from '@/components'
import useAuthStore from '@/store/auth.store'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
<<<<<<< HEAD
=======
import { useLocation } from '@tanstack/react-router'
>>>>>>> e78b135853b8e78486e8d9af491a8c092221f566

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()
  
  const isAuthRoute = location.pathname.startsWith('/auth')
  const isIndexRoute = location.pathname === '/'

  return (
    <>
      <Notifications position="top-right" />
      
      {!isAuthRoute && <Header />}
      {!isAuthRoute && <hr className="border-gray-300 dark:border-gray-600" />}

      {isAuthRoute || isIndexRoute ? (
        <Outlet />
      ) : (
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      )}
      
      <TanStackRouterDevtools />
      <TanstackQueryLayout />
    </>
  )
}
