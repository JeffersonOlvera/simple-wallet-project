import { createFileRoute, Navigate } from '@tanstack/react-router'
import { LoginForm } from '@/components/auth/LoginForm'
import useAuthStore from '@/store/auth.store'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})

function LoginPage() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/events" />
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors">
      <LoginForm />
    </div>
  )
}