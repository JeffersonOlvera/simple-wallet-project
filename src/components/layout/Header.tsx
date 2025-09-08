import { Link } from '@tanstack/react-router'
import { LogOut, User } from 'lucide-react'
import { Button, ThemeButton } from '@/components'
import useAuthStore from '@/store/auth.store'
import { notifications } from '@/lib/notification'

export const Header = () => {
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    notifications.info({
      title: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente',
    })
  }

  return (
    <header className="p-2 flex gap-2 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md dark:shadow-lg transition-colors">
      <nav className="flex px-5 flex-row w-screen justify-between items-center">
        <div className="px-2 py-2 font-bold">
          <Link
            to="/events"
            className="text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Wallet
            <span className="text-purple-500 dark:text-purple-400">fy</span>2
          </Link>
        </div>
        {user && (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/events">Eventos</Link>
            <Link to="/chat">Asistente IA</Link>
          </div>
        )}

        <div className="flex gap-2">
          {user && (
            <div className="hidden sm:flex items-center gap-3 mr-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Salir</span>
              </button>
            </div>
          )}
          <Link to="/events/form/$id" params={{ id: 'new' }}>
            <Button
              label="Crear evento"
              variant="outline"
              color="purple"
              className="hidden sm:inline-flex"
            />
          </Link>
          <ThemeButton />

          {/* Mobile user menu */}
          {user && (
            <div className="sm:hidden">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
