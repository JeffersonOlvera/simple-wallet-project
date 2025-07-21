import { create } from 'zustand'

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
  
  localStorage.setItem('theme', theme)
  html.style.colorScheme = theme

  console.log(`📋 Classes finales: ${html.className}`)
  console.log(`💾 localStorage: ${localStorage.getItem('theme')}`)
}

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

const getInitialBalance = (): number => {
  if (typeof window === 'undefined') return 0
  
  const saved = localStorage.getItem('initialBalance')
  const balance = saved ? parseFloat(saved) : 0
  return isNaN(balance) ? 0 : balance
}

interface BalanceState {
  role: 'user'
  theme: 'light' | 'dark'
  initialBalance: number
  setTheme: (theme: 'light' | 'dark') => void
  setInitialBalance: (balance: number) => void
  getBalanceForMonth: (events: Array<any>, monthIndex: number) => {
    totalIngresos: number
    totalEgresos: number
    balanceMensual: number
    balanceGlobal: number
  }
}

const useAppStore = create<BalanceState>((set, get) => {
  const initialTheme = getInitialTheme()
  const initialBalance = getInitialBalance()
  

  if (typeof window !== 'undefined') {
    applyTheme(initialTheme)
  }
  
  return {
    role: 'user',
    theme: initialTheme,
    initialBalance,
    setTheme: (newTheme: 'light' | 'dark') => {
      console.log(`🔄 setTheme llamado: ${get().theme} → ${newTheme}`)
      
      set({ theme: newTheme })
      
      applyTheme(newTheme)
      
      console.log(`✅ Tema cambiado a: ${newTheme}`)
    },
    setInitialBalance: (balance: number) => {
      set({ initialBalance: balance })
      localStorage.setItem('initialBalance', balance.toString())
    },
    getBalanceForMonth: (events, _monthIndex) => {
      const state = get()
      
      const totalIngresos = events
        .filter(event => event.tipo === 'ingreso')
        .reduce((sum, event) => sum + parseFloat(event.cantidad || '0'), 0)
      
      const totalEgresos = events
        .filter(event => event.tipo === 'egreso') 
        .reduce((sum, event) => sum + parseFloat(event.cantidad || '0'), 0)
      
      const balanceMensual = totalIngresos - totalEgresos
      
      console.log(`🌍 Balance global: ${state.initialBalance} + ${balanceMensual}`)
      const balanceGlobal = state.initialBalance + balanceMensual
      
      return {
        totalIngresos,
        totalEgresos,
        balanceMensual,
        balanceGlobal
      }
    }
  }
})

export default useAppStore