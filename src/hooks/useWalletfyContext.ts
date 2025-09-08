import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import LocalStorageDS from '@/api/impl/ds/LocalStorageDS'
import useAppStore from '@/store/index'
import useAuthStore from "@/store/auth.store"
import type { WalletfyContextData } from '@/types/chat.type'

export const useWalletfyContext = (): WalletfyContextData => {
  const { user } = useAuthStore()
  const { initialBalance, getBalanceForMonth } = useAppStore()
  const localStorageDS = new LocalStorageDS()

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: () => localStorageDS.getEvents(),
  })

  const events = Array.isArray(data) ? data : []

  return useMemo(() => {
    const balance = getBalanceForMonth(events, 0)

    const ingresos = events.filter(e => e.tipo === 'ingreso')
    const egresos = events.filter(e => e.tipo === 'gasto')

    const mayorIngreso = ingresos.length > 0 
      ? Math.max(...ingresos.map(e => e.cantidad)) 
      : 0

    const mayorEgreso = egresos.length > 0 
      ? Math.max(...egresos.map(e => e.cantidad)) 
      : 0

    const eventosFormateados = events.map(event => ({
      id: event.id,
      nombre: event.nombre,
      descripcion: event.descripccion, // estandariza si puedes
      cantidad: event.cantidad,
      fecha: new Date(event.fecha).toLocaleDateString('es-ES'),
      tipo: event.tipo,
    }))

    return {
      user: user ? { name: user.name, email: user.email } : null,
      balance: {
        inicial: initialBalance,
        global: balance.balanceGlobal,
        mensual: balance.balanceMensual,
        totalIngresos: balance.totalIngresos,
        totalEgresos: balance.totalEgresos,
      },
      eventos: eventosFormateados,
      estadisticas: {
        totalEventos: events.length,
        promedioMensual: balance.balanceMensual,
        mayorIngreso,
        mayorEgreso,
      },
      estado: {
        cargando: isLoading,
        error: error ? String(error) : null,
      },
    }
  }, [user, events, initialBalance, getBalanceForMonth, isLoading, error])
}
