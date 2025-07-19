import { EventsContainer, EventsForm, EventsCard, Button } from '@/components'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { EventType } from '@/types/event.type'
import { getEvents } from '@/api/events'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState, useMemo } from 'react'
import DataRepo from '@/api/datasource'
import SearchInput from '@/components/SearchInput'
import { Pagination } from '@/components/pagination'
import { notifications } from '@/lib/notification'
import { useDebounce } from '@/hooks/debounce'
import { usePagination } from '@/api/hooks/pagination'

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

const groupEventsByMonth = (events: EventType[]) => {
  const grouped = events.reduce(
    (acc, event) => {
      const date = new Date(event.fecha)
      const monthYear = `${date.getFullYear()}-${date.getMonth()}`

      if (!acc[monthYear]) {
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
    {} as Record<
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
    >,
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
  const { tipo } = Route.useSearch()
  const queryClient = useQueryClient()

  // const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])

  const candidatesQuery = useQuery({
    queryKey: ['candidates'],
    queryFn: () => DataRepo.getEvents(),
    retry: 3,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  })

  // const deleteMutation = useMutation({
  //   mutationFn: (eventId: string) => DataRepo.deleteEvent(eventId),
  //   onSettled: (_, error) => {
  //     if (error) {
  //       notifications.error({
  //         title: 'Error',
  //         message:
  //           error.message || 'An error occurred while deleting the event',
  //       })
  //     } else {
  //       notifications.success({
  //         title: 'Success',
  //         message: 'Candidate deleted successfully!',
  //       })
  //     }
  //     queryClient.invalidateQueries({ queryKey: ['candidates'] })
  //   },
  // })

  const [searchResults, _setSearchResults] = useState<Array<EventType>>([])
  const [debouncedSearchValue, _setSearchValue, _searchValue] = useDebounce(
    '',
    1000,
  )

  const filterEvents = useCallback(
    function (value: string): Array<EventType> {
      console.log('Buscando')

      if (!candidatesQuery.data || candidatesQuery.data.length === 0) {
        return []
      }

      if (value.length === 0) {
        return candidatesQuery.data
      }

      return candidatesQuery.data.filter((c) => c.nombre.includes(value))
    },
    [candidatesQuery.data],
  )

  // const handleDelete = useCallback(
  //   (candidateId: string) => {
  //     const isConfirmed = window.confirm(
  //       '¿Estas seguro que deseas eliminar este candidato? Esta acción no se puede deshacer.',
  //     )

  //     if (isConfirmed) {
  //       deleteMutation.mutate(candidateId)
  //     }
  //   },
  //   [deleteMutation],
  // )

  // useEffect(() => {
  //   const result = filterEvents(debouncedSearchValue)
  //   setSearchResults(result)
  // }, [debouncedSearchValue, filterEvents])

  // Agrupar eventos por mes
  const groupedEvents = useMemo(() => {
    const eventsToGroup =
      searchResults.length > 0 ? searchResults : candidatesQuery.data || []
    return groupEventsByMonth(eventsToGroup)
  }, [searchResults, candidatesQuery.data])

  // Calcular totales
  const totalEvents = useMemo(() => {
    return groupedEvents.reduce(
      (total, month) => total + month.eventos.length,
      0,
    )
  }, [groupedEvents])

  const totalMonths = groupedEvents.length

  if (candidatesQuery.isPending) {
    return <div className="p-4">Loading...</div>
  }

  if (candidatesQuery.error) {
    return (
      <div className="p-4 text-red-500">
        Error: {candidatesQuery.error.message}
      </div>
    )
  }

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 py-6 gap-4 flex flex-col transition-colors">
      <EventsForm />

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

        {/* Mensaje cuando no hay eventos */}
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
