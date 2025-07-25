import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Card } from '@/components/Card'
import { EventsCardBody, EventsCardTitle } from '@/components/events/card'

interface EventsCardProps {
  mes: string
  anio: string
  eventos: Array<{
    id: string
    titulo: string
    descripcion: string
    fecha?: string
    cantidad?: string
    tipo?: 'Egreso' | 'Ingreso'
  }>
}

export const EventsCard = ({ mes, anio, eventos }: EventsCardProps) => {
  const navigate = useNavigate()
  const [balanceInicial, setBalanceInicial] = useState(0)

  useEffect(() => {
    const balanceGuardado = localStorage.getItem('initialBalance')
    if (balanceGuardado) {
      setBalanceInicial(parseFloat(balanceGuardado))
    }
  }, [balanceInicial])

  const totales = useMemo(() => {
    const ingresos = eventos
      .filter((evento) => evento.tipo === 'Ingreso')
      .reduce((sum, evento) => sum + parseFloat(evento.cantidad || '0'), 0)

    const gastos = eventos
      .filter((evento) => evento.tipo === 'Egreso')
      .reduce((sum, evento) => sum + parseFloat(evento.cantidad || '0'), 0)

    const mensual = ingresos - gastos
    const global = balanceInicial + mensual

    return {
      ingresos,
      gastos,
      mensual,
      global,
    }
  }, [eventos, balanceInicial])

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-ES')}`
  }

  const handleEventClick = (eventoId: string) => {
    navigate({
      to: '/events/form/$id',
      params: { id: eventoId },
    })
  }

  return (
    <Card className="h-fit bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 transition-colors">
      <EventsCardTitle mes={mes} anio={anio} />

      <hr className="mb-4 text-gray-200 dark:border-gray-600" />

      <div className="flex flex-col gap-2 my-4">
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <EventsCardBody
              key={evento.id}
              titulo={evento.titulo}
              fecha={evento.fecha}
              cantidad={evento.cantidad}
              tipo={evento.tipo}
              onClick={() => handleEventClick(evento.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No hay eventos este mes
          </p>
        )}
      </div>

      <hr className="mb-4 text-gray-200 dark:border-gray-600" />

      <div className="mt-4 px-2 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Ingreso:
          </span>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">
            {formatCurrency(totales.ingresos)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Gasto:
          </span>
          <span className="text-sm font-bold text-red-500 dark:text-red-400">
            {formatCurrency(totales.gastos)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Mensual:
          </span>
          <span
            className={`text-sm font-bold ${
              totales.mensual >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-500 dark:text-red-400'
            }`}
          >
            {formatCurrency(totales.mensual)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Global:
          </span>
          <span 
            className={`text-sm font-bold ${
              totales.global >= 0
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-red-500 dark:text-red-400'
            }`}
          >
            {formatCurrency(totales.global)}
          </span>
        </div>
      </div>
    </Card>
  )
}