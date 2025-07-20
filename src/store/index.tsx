import { create } from 'zustand'
import type { StoreType } from '../types/store'

// Función simple para aplicar tema en Tailwind 4
const applyTheme = (theme: 'light' | 'dark') => {
  console.log(`🎨 Aplicando tema: ${theme}`)
  
  const html = document.documentElement
  
  if (theme === 'dark') {
    html.classList.add('dark')
    console.log('✅ Clase dark añadida')
  } else {
    html.classList.remove('dark')
    console.log('✅ Clase dark removida')
  }
  
  // Guardar en localStorage
  localStorage.setItem('theme', theme)
  
  // Forzar actualización del color-scheme
  html.style.colorScheme = theme
  
  console.log(`📋 Classes finales: ${html.className}`)
  console.log(`💾 localStorage: ${localStorage.getItem('theme')}`)
}

// Obtener tema inicial
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') {
    console.log(`📖 Tema desde localStorage: ${saved}`)
    return saved
  }
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const systemTheme = prefersDark ? 'dark' : 'light'
  console.log(`🖥️ Tema del sistema: ${systemTheme}`)
  return systemTheme
}

const useAppStore = create<StoreType>((set, get) => {
  const initialTheme = getInitialTheme()
  
  // Aplicar tema inicial inmediatamente
  if (typeof window !== 'undefined') {
    applyTheme(initialTheme)
  }
  
  return {
    role: 'user',
    theme: initialTheme,
    setTheme: (newTheme: 'light' | 'dark') => {
      console.log(`🔄 setTheme llamado: ${get().theme} → ${newTheme}`)
      
      // Actualizar estado
      set({ theme: newTheme })
      
      // Aplicar al DOM
      applyTheme(newTheme)
      
      console.log(`✅ Tema cambiado a: ${newTheme}`)
    },
  }
})

export default useAppStore

