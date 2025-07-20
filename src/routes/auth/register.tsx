<<<<<<< HEAD
import { Navigate, createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '@/components/auth/Register'
=======
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { RegisterForm } from '@/components/auth/RegisterForm'
>>>>>>> e78b135853b8e78486e8d9af491a8c092221f566
import useAuthStore from '@/store/auth.store'

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/events" />
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors">
      <RegisterForm />
    </div>
  )
}