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
  return (
    <Card className="">
      <EventsCardTitle mes={mes} anio={anio} />

      <hr className="mb-4 text-gray-200" />

      <div className="flex flex-col gap-2 my-4">
        {eventos.map((evento) => (
          <EventsCardBody
            key={evento.id}
            titulo={evento.titulo}
            fecha={evento.fecha}
            cantidad={evento.cantidad}
            tipo={evento.tipo}
          />
        ))}
      </div>

      <hr className="mb-4 text-gray-200" />

      <div className="mt-4 px-2">
        <p>Ingreso:</p>
        <p>Gasto:</p>
        <p>Mes:</p>
        <p>Global:</p>
      </div>
    </Card>
  )
}
