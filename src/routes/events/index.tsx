import { Link, createFileRoute } from '@tanstack/react-router'
import {  useQuery,  } from '@tanstack/react-query'
import {  useMemo, useState } from 'react'
import type { EventType } from '@/types/event.type'
import { getEvents } from '@/api/events'
import { Button, EventsCard, EventsContainer, EventsInitialBalance } from '@/components'
import DataRepo from '@/api/datasource'
import { useDebounce } from '@/hooks/debounce'


type SearchParams = {
  tipo?: string
}

// Utilidades para fechas y agrupación
const monthNames = [
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

const groupEventsByMonth = (events: Array<EventType>) => {
  const grouped = events.reduce(
    (acc: Record<
      string,
      {
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
    >, event) => {
      const date = new Date(event.fecha)
      const monthYear = `${date.getFullYear()}-${date.getMonth()}`
  
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
        tipo:
          event.tipo === 'ingreso'
            ? 'Ingreso'
            : ('Egreso' as 'Ingreso' | 'Egreso'),
      })
  
      return acc
    },
    {},
  )

  // Ordenar por fecha (más reciente primero)
  return Object.values(grouped).sort((a, b) => {
    const dateA = new Date(`${a.anio}-${monthNames.indexOf(a.mes) + 1}-01`)
    const dateB = new Date(`${b.anio}-${monthNames.indexOf(b.mes) + 1}-01`)
    return dateB.getTime() - dateA.getTime()
  })
}

export const Route = createFileRoute('/events/')({
  component: RouteComponent,
  validateSearch: (
    search: Record<string, string | undefined>,
  ): SearchParams => ({
    tipo: search.tipo,
  }),
  loaderDeps: ({ search }) => ({
    tipo: search.tipo,
  }),
  loader: async ({ deps }) => {
    const { tipo } = deps

    const events = await new Promise<Array<EventType>>((resolve) => {
      setTimeout(() => {
        resolve(getEvents(tipo))
      }, 1000)
    })

    return events
  },
})

function RouteComponent() {

  const eventsQuery = useQuery({
    queryKey: ['events'],
    queryFn: () => DataRepo.getEvents(),
    retry: 3,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  })

  const [searchResults, _setSearchResults] = useState<Array<EventType>>([])
  const [debouncedSearchValue, _setSearchValue, _searchValue] = useDebounce(
    '',
    1000,
  )


  const groupedEvents = useMemo(() => {
    const eventsToGroup =
      searchResults.length > 0 ? searchResults : eventsQuery.data || []
    return groupEventsByMonth(eventsToGroup)
  }, [searchResults, eventsQuery.data])


  const totalEvents = useMemo(() => {
    return groupedEvents.reduce(
      (total, month) => total + month.eventos.length,
      0,
    )
  }, [groupedEvents])

  const totalMonths = groupedEvents.length

  if (eventsQuery.isPending) {
    return <div className="p-4">Loading...</div>
  }

  if (eventsQuery.error) {
    return (
      <div className="p-4 text-red-500">
        Error: {eventsQuery.error.message}
      </div>
    )
  }

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 py-6 gap-4 flex flex-col transition-colors">
      <EventsInitialBalance />

      <Link to="/events/form/$id" params={{ id: 'new' }}>
        <Button
          label="+ Crear evento"
          variant="solid"
          color="purple"
          className="md:hidden w-full"
        />
      </Link>
      {/* Resumen de eventos */}
      <div>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Tienes {totalEvents} eventos en {totalMonths}{' '}
          {totalMonths === 1 ? 'mes' : 'meses'}
        </p>
      </div>
      <EventsContainer>
        {groupedEvents.map((monthData, _index) => (
          <EventsCard
            key={`${monthData.anio}-${monthData.mes}`}
            mes={monthData.mes}
            anio={monthData.anio}
            eventos={monthData.eventos}
          />
        ))}

        {groupedEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {debouncedSearchValue
                ? `No se encontraron eventos para "${debouncedSearchValue}"`
                : 'No hay eventos registrados'}
            </p>
          </div>
        )}
      </EventsContainer>
    </main>
  )
}
