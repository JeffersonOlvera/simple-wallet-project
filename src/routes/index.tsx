import { createFileRoute } from '@tanstack/react-router'
import { Navigate } from '@tanstack/react-router'
import useAuthStore from '@/store/auth.store'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/events" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center px-4">
      <div className="text-center text-white max-w-2xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          Wallet<span className="text-yellow-300">fy</span>2
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-100">
          Gestiona tus finanzas personales de manera inteligente
        </p>
        <p className="text-lg mb-12 text-purple-200 max-w-lg mx-auto">
          Controla tus ingresos y gastos, visualiza tus patrones de gasto y toma decisiones financieras informadas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Navigate to="/auth/login">
            <button className="bg-white text-purple-700 font-semibold py-4 px-8 rounded-lg hover:bg-purple-50 transition-colors shadow-lg">
              Iniciar Sesión
            </button>
          </Navigate>
          <Navigate to="/auth/register">
            <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-purple-700 transition-colors">
              Crear Cuenta
            </button>
          </Navigate>
        </div>
      </div>
    </div>
  )
}
