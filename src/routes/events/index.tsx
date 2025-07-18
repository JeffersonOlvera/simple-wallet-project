import { EventsContainer, EventsForm, EventsCard, Button } from '@/components'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/events/')({
  component: RouteComponent,
})

function RouteComponent() {
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
        <EventsCard
          mes="Enero"
          anio="2023"
          eventos={[
            {
              id: '1',
              titulo: 'Evento 1',
              descripcion: 'Descripción del Evento 1',
              fecha: '2023-01-01',
              cantidad: '100',
              tipo: 'Ingreso',
            },
            {
              id: '2',
              titulo: 'Evento 2',
              descripcion: 'Descripción del Evento 2',
              fecha: '2023-01-02',
              cantidad: '200',
              tipo: 'Egreso',
            },
          ]}
        />
        <EventsCard
          mes="Febrero"
          anio="2023"
          eventos={[
            {
              id: '3',
              titulo: 'Evento 3',
              descripcion: 'Descripción del Evento 3',
              fecha: '2023-02-01',
              cantidad: '150',
              tipo: 'Ingreso',
            },
            {
              id: '4',
              titulo: 'Evento 4',
              descripcion: 'Descripción del Evento 4',
              fecha: '2023-02-02',
              cantidad: '250',
              tipo: 'Egreso',
            },
          ]}
        />
        <EventsCard
          mes="Febrero"
          anio="2023"
          eventos={[
            {
              id: '3',
              titulo: 'Evento 3',
              descripcion: 'Descripción del Evento 3',
              fecha: '2023-02-01',
              cantidad: '150',
              tipo: 'Ingreso',
            },
            {
              id: '4',
              titulo: 'Evento 4',
              descripcion: 'Descripción del Evento 4',
              fecha: '2023-02-02',
              cantidad: '250',
              tipo: 'Egreso',
            },
          ]}
        />
      </EventsContainer>
    </main>
  )
}
