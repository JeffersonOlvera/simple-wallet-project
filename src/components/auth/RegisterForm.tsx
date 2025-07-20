import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import type {RegisterType} from '@/types/auth.type';
import { useAppForm } from '@/hooks/form'
import { RegisterSchema  } from '@/types/auth.type'
import useAuthStore from '@/store/auth.store'
import { notifications } from '@/lib/notification'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { register, isLoading, error, clearError } = useAuthStore()

  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    } as RegisterType,
    onSubmit: async ({ value }) => {
      clearError()
      try {
        await register(value)
        notifications.success({
          title: 'Cuenta creada',
          message: 'Tu cuenta ha sido creada exitosamente',
        })
        navigate({ to: '/events' })
      } catch (err) {
        notifications.error({
          title: 'Error al crear cuenta',
          message: err instanceof Error ? err.message : 'Por favor, verifica tus datos',
        })
      }
    },
    validators: {
      onSubmit: RegisterSchema,
    },
  })

  React.useEffect(() => {
    if (error) {
      notifications.error({
        title: 'Error de registro',
        message: error,
      })
    }
  }, [error])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Wallet<span className="text-purple-500 dark:text-purple-400">fy</span>2
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Crea tu cuenta
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
            name="name"
            children={(field) => (
              <field.Input
                type="text"
                label="Nombre completo"
                placeholder="Tu nombre"
                className="w-full"
              />
            )}
          />

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

          <form.AppField
            name="confirmPassword"
            children={(field) => (
              <field.Input
                type="password"
                label="Confirmar contraseña"
                placeholder="••••••••"
                className="w-full"
              />
            )}
          />

          <form.AppForm>
            <form.SubmitButton
              text={isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form.AppForm>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => navigate({ to: '/auth/login' })}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}