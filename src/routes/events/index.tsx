import { EventsContainer, EventsForm, EventsCard, Button } from '@/components'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { EventType } from '@/types/event.type'
import { getEvents } from '@/api/events'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import DataRepo from '@/api/datasource'
import SearchInput from '@/components/SearchInput'
import { Pagination } from '@/components/pagination'
import { notifications } from '@/lib/notification'
import { useDebounce } from '@/hooks/debounce'
import { usePagination } from '@/api/hooks/pagination'

type SearchParams = {
  tipo?: string
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

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])

  const candidatesQuery = useQuery({
    queryKey: ['candidates'],
    queryFn: () => DataRepo.getEvents(),
    retry: 3,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  })

  const deleteMutation = useMutation({
    mutationFn: (eventId: string) => DataRepo.deleteEvent(eventId),
    onSettled: (_, error) => {
      if (error) {
        notifications.error({
          title: 'Error',
          message:
            error.message || 'An error occurred while deleting the event',
        })
      } else {
        notifications.success({
          title: 'Success',
          message: 'Candidate deleted successfully!',
        })
      }
      queryClient.invalidateQueries({ queryKey: ['candidates'] })
    },
  })

  const [searchResults, setSearchResults] = useState<Array<EventType>>([])
  const [debouncedSearchValue, setSearchValue, searchValue] = useDebounce(
    '',
    1000,
  )

  const pagination = usePagination<EventType>({
    data: searchResults.length > 0 ? searchResults : candidatesQuery.data || [],
    pageSize: 2,
  })

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

  const handleDelete = useCallback(
    (candidateId: string) => {
      const isConfirmed = window.confirm(
        '¿Estas seguro que deseas eliminar este candidato? Esta acción no se puede deshacer.',
      )

      if (isConfirmed) {
        deleteMutation.mutate(candidateId)
      }
    },
    [deleteMutation],
  )

  useEffect(() => {
    const result = filterEvents(debouncedSearchValue)
    setSearchResults(result)
  }, [debouncedSearchValue, filterEvents])

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

  const currentPageIds = pagination.pageData.map((event) => event.id)
  const allPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedCandidates.includes(id))

  return (
    <main className="bg-gray-100 min-h-screen px-4 py-6 gap-4 flex flex-col">
      <EventsForm />

      <Link to="/events/create/$id" params={{ id: 'new' }}>
        <Button
          label="+ Crear evento"
          variant="solid"
          color="purple"
          className="md:hidden w-full"
        ></Button>
      </Link>

      <EventsContainer>
        {/*Eventos en este mes*/}
        <p>{pagination.pageData.length} eventos encontrados</p>
      </EventsContainer>
    </main>
  )
}
function filterEvents(debouncedSearchValue: string) {
  throw new Error('Function not implemented.')
}
