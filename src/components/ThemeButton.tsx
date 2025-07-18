import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import useAppStore from '@/store/index'

const handleChangeTheme: React.MouseEventHandler<HTMLButtonElement> = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', newTheme)
  console.log(`Theme changed to: ${newTheme}`)
  localStorage.setItem('theme', newTheme)
}

export const ThemeButton = () => {
  const { setTheme, role, theme } = useAppStore()

  return (
    <div>
      <button
        className={cn(
          'rounded-4xl w-8 h-8 cursor-pointer',
          // role === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white',
        )}
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
          console.log(
            `Theme changed to: ${theme === 'light' ? 'dark' : 'light'}`,
          )
        }}
      >
        {theme === 'light' ? <Moon /> : <Sun />}
      </button>
    </div>
  )
}

export default ThemeButton
