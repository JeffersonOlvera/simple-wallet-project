import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import useAppStore from '@/store/index'
import React from 'react'

export const ThemeButton = () => {
  const { setTheme, theme } = useAppStore()

<<<<<<< HEAD
  const handleClick = () => {
    console.log(`🖱️ Click! Tema actual: ${theme}`)
    
=======
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
>>>>>>> e78b135853b8e78486e8d9af491a8c092221f566
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log(`🎯 Cambiando a: ${newTheme}`)
    
    setTheme(newTheme)
  }

  console.log(`🔄 ThemeButton render - tema: ${theme}`)

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative rounded-full w-10 h-10 p-2 transition-all duration-200',
        'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600',
        'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100',
        'border border-gray-300 dark:border-gray-600',
        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
        'flex items-center justify-center'
      )}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Actual: ${theme}. Click para cambiar`}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
      
    </button>
  )
}

export default ThemeButton