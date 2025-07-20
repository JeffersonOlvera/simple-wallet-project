import React from 'react'
import { Navigate } from '@tanstack/react-router'
import useAuthStore from '@/store/auth.store'

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