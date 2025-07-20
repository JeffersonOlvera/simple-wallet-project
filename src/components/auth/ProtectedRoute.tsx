import React from 'react'
import { Navigate } from '@tanstack/react-router'
import useAuthStore from '@/store/auth.store'

<<<<<<< HEAD

=======
>>>>>>> e78b135853b8e78486e8d9af491a8c092221f566
interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />
  }

  return <>{children}</>
}