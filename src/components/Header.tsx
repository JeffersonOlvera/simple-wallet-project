import { Link } from '@tanstack/react-router'
import {
  Button,
  ThemeButton,
  // ProfileIcon
} from '@/components'

export const Header = () => {
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
        <div className="flex gap-2">
          <Link to="/events/form/$id" params={{ id: 'new' }}>
            <Button
              label="Crear evento"
              variant="outline"
              color="purple"
              className="hidden sm:inline-flex"
            />
          </Link>
          <ThemeButton />
        </div>
      </nav>
    </header>
  )
}
