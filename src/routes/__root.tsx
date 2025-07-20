import { Outlet,createRootRoute, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Notifications } from '@mantine/notifications'
import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import { Header } from '@/components'
import useAuthStore from '@/store/auth.store'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

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
