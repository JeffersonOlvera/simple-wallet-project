import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import useAppStore from '@/store/index'
import React from 'react'

export const ThemeButton = () => {
  const { setTheme, theme } = useAppStore()

  // Forzar re-render cuando cambie el tema
  React.useEffect(() => {
    // Aplicar el tema inmediatamente al DOM
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    }
  }, [theme])

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <div>
      <button
        className={cn(
          'rounded-full w-10 h-10 p-2 cursor-pointer transition-all duration-200 flex items-center justify-center',
          'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600',
          'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100',
          'border border-gray-300 dark:border-gray-600',
        )}
        onClick={handleThemeToggle}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}

export default ThemeButton
