import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StoreType } from '../types/store'

// Función para obtener el tema inicial
const getInitialTheme = (): 'light' | 'dark' => {
  // Verificar si estamos en el browser
  if (typeof window === 'undefined') return 'light'

  // Verificar localStorage primero
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  // Verificar preferencia del sistema
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

// Función para aplicar el tema
const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof window === 'undefined') return

  const root = document.documentElement

  if (theme === 'dark') {
    root.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
  } else {
    root.classList.remove('dark')
    root.setAttribute('data-theme', 'light')
  }

  localStorage.setItem('theme', theme)
}

const useAppStore = create<StoreType>()(
  persist(
    (set) => {
      // Inicializar tema
      const initialTheme = getInitialTheme()
      applyTheme(initialTheme)

      return {
        role: 'user',
        theme: initialTheme,
        setTheme: (theme) =>
          set((state) => {
            applyTheme(theme)
            return {
              ...state,
              theme,
            }
          }),
      }
    },
    {
      name: 'app-storage',
      partialize: (state) => ({
        theme: state.theme,
        role: state.role
      })
    }
  )
)

export default useAppStore
