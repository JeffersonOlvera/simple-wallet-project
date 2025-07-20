import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserType, LoginType, RegisterType } from '@/types/auth.type'

interface AuthState {
  user: UserType | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginType) => Promise<void>
  register: (userData: RegisterType) => Promise<void>
  logout: () => void
  clearError: () => void
}

// Simulación de usuarios para demo
const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@walletfy.com',
    password: '123456',
    name: 'Administrador'
  },
  {
    id: '2',
    email: 'user@walletfy.com',
    password: '123456',
    name: 'Usuario Demo'
  }
]

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginType) => {
        set({ isLoading: true, error: null })
        
        try {
          // Simular delay de API
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Buscar usuario en la "base de datos" demo
          const user = DEMO_USERS.find(
            u => u.email === credentials.email && u.password === credentials.password
          )
          
          if (!user) {
            throw new Error('Credenciales inválidas')
          }
          
          const { password, ...userWithoutPassword } = user
          
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error de autenticación',
            isLoading: false
          })
        }
      },

      register: async (userData: RegisterType) => {
        set({ isLoading: true, error: null })
        
        try {
          // Simular delay de API
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Verificar si el email ya existe
          const existingUser = DEMO_USERS.find(u => u.email === userData.email)
          if (existingUser) {
            throw new Error('El email ya está registrado')
          }
          
          // Crear nuevo usuario
          const newUser = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name
          }
          
          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error de registro',
            isLoading: false
          })
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        })
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export default useAuthStore