import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getEvents } from '@/api/events'
import useAppStore from '@/store/index'
import useAuthStore from "@/store/auth.store"
import type { WalletfyContextData } from '@/types/chat.type'

export const useWalletfyContext = (): WalletfyContextData => {
  const { user } = useAuthStore()
  const { initialBalance, getBalanceForMonth } = useAppStore()
  
  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  return useMemo(() => {
    // Calculate current balance
    const balance = getBalanceForMonth(events, 0)
    
    // Calculate statistics
    const ingresos = events.filter(e => e.tipo === 'ingreso')
    const egresos = events.filter(e => e.tipo === 'egreso')
    
    const mayorIngreso = ingresos.length > 0 
      ? Math.max(...ingresos.map(e => e.cantidad)) 
      : 0
    
    const mayorEgreso = egresos.length > 0 
      ? Math.max(...egresos.map(e => e.cantidad)) 
      : 0

    const eventosFormateados = events.map(event => ({
      id: event.id,
      nombre: event.nombre,
      descripcion: event.descripccion,
      cantidad: event.cantidad,
      fecha: new Date(event.fecha).toLocaleDateString('es-ES'),
      tipo: event.tipo
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
      }
    }
  }, [user, events, initialBalance, getBalanceForMonth])
}