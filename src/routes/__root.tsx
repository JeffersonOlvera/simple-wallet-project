import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import { Header } from '@/components'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <hr className="border-gray-300" />

      <Outlet />
      <TanStackRouterDevtools />
      <TanstackQueryLayout />
    </>
  ),
})
