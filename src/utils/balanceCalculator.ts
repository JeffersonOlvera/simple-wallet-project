import type { EventType } from '@/types/event.type'

export interface MonthBalance {
  mes: string
  anio: string
  totalIngresos: number
  totalEgresos: number
  balanceMensual: number
  balanceGlobal: number
  eventos: Array<EventType>
}

export interface GroupedMonth {
  mes: string
  anio: string
  eventos: Array<{
    id: string
    titulo: string
    descripcion: string
    fecha?: string
    cantidad?: string
    tipo?: 'Egreso' | 'Ingreso'
    adjunto?: string
  }>
}

export const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export const groupEventsByMonth = (
  events: Array<EventType>,
): Array<GroupedMonth> => {
  const grouped = events.reduce((acc: Record<string, GroupedMonth>, event) => {
    const date = new Date(event.fecha)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`

    if (!(monthYear in acc)) {
      acc[monthYear] = {
        mes: monthNames[date.getMonth()],
        anio: date.getFullYear().toString(),
        eventos: [],
      }
    }

    acc[monthYear].eventos.push({
      id: event.id,
      titulo: event.nombre,
      descripcion: event.descripccion || '',
      fecha: date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      cantidad: event.cantidad.toString(),
      tipo: event.tipo === 'ingreso' ? 'Ingreso' : 'Egreso',
      adjunto: event.adjunto,
    })

    return acc
  }, {})

  return Object.entries(grouped)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => {
      const [yearA, monthA] = a.key.split('-').map(Number)
      const [yearB, monthB] = b.key.split('-').map(Number)

      if (yearA !== yearB) return yearA - yearB
      return monthA - monthB
    })
    .map(({ key, ...rest }) => rest)
}

export const calculateMonthlyBalances = (
  groupedEvents: Array<GroupedMonth>,
  initialBalance: number,
): Array<MonthBalance> => {
  let runningBalance = initialBalance

  return groupedEvents.map((month) => {
    const totalIngresos = month.eventos
      .filter((evento) => evento.tipo === 'Ingreso')
      .reduce((sum, evento) => sum + parseFloat(evento.cantidad || '0'), 0)

    const totalEgresos = month.eventos
      .filter((evento) => evento.tipo === 'Egreso')
      .reduce((sum, evento) => sum + parseFloat(evento.cantidad || '0'), 0)

    const balanceMensual = totalIngresos - totalEgresos

    runningBalance += balanceMensual
    const balanceGlobal = runningBalance

    const eventos: Array<EventType> = month.eventos.map((evento) => ({
      id: evento.id,
      nombre: evento.titulo,
      descripccion: evento.descripcion,
      cantidad: parseFloat(evento.cantidad || '0'),
      fecha: new Date(evento.fecha?.split('/').reverse().join('-') || ''),
      tipo: evento.tipo === 'Ingreso' ? 'ingreso' : 'egreso',
      adjunto: evento.adjunto,
    }))

    return {
      mes: month.mes,
      anio: month.anio,
      totalIngresos,
      totalEgresos,
      balanceMensual,
      balanceGlobal,
      eventos,
    }
  })
}

export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export const calculateTotalSummary = (monthlyBalances: Array<MonthBalance>) => {
  const totalIngresos = monthlyBalances.reduce(
    (sum, month) => sum + month.totalIngresos,
    0,
  )
  const totalEgresos = monthlyBalances.reduce(
    (sum, month) => sum + month.totalEgresos,
    0,
  )
  const balanceTotal = totalIngresos - totalEgresos
  const finalBalance =
    monthlyBalances.length > 0
      ? monthlyBalances[monthlyBalances.length - 1].balanceGlobal
      : 0

  return {
    totalIngresos,
    totalEgresos,
    balanceTotal,
    finalBalance,
    totalEventos: monthlyBalances.reduce(
      (sum, month) => sum + month.eventos.length,
      0,
    ),
    totalMeses: monthlyBalances.length,
  }
}
