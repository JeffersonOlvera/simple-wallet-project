import React from 'react'
import { useNavigate } from '@tanstack/react-router'

import type {LoginType} from '@/types/auth.type';
import { useAppForm } from '@/hooks/form'
import { LoginSchema   } from '@/types/auth.type'
import useAuthStore from '@/store/auth.store'
import { notifications } from '@/lib/notification'

export const LoginForm = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginType,
    onSubmit: async ({ value }) => {
      clearError()
      try {
        await login(value)
        notifications.success({
          title: 'Bienvenido',
          message: 'Has iniciado sesión correctamente',
        })
        navigate({ to: '/events' })
      } catch (error) 
      {
        notifications.error({
          title: 'Error al iniciar sesión',
          message: error.message || 'Por favor, verifica tus credenciales',
        })
      }
    },
    validators: {
      onSubmit: LoginSchema,
    },
  })

  // React.useEffect(() => {
  //   if (error) {
      
  //   }
  // }, [error])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Wallet<span className="text-purple-500 dark:text-purple-400">fy</span>2
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Inicia sesión en tu cuenta
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-6"
        >
          <form.AppField
            name="email"
            children={(field) => (
              <field.Input
                type="email"
                label="Email"
                placeholder="tu@email.com"
                className="w-full"
              />
            )}
          />

          <form.AppField
            name="password"
            children={(field) => (
              <field.Input
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                className="w-full"
              />
            )}
          />

          <form.AppForm>
            <form.SubmitButton
              text={isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form.AppForm>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => navigate({ to: '/auth/register' })}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              Regístrate aquí
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
            Cuentas de prueba:
          </p>
          <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
            <p>• admin@walletfy.com / 123456</p>
            <p>• user@walletfy.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  )
}