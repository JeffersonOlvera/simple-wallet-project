interface EventsCardProps {
  // Define any props that the EventsCard component might need
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
    <div className="border border-gray-300 bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        {mes} {anio}
      </h2>

      <hr className="mb-4" />
      {eventos.map((evento) => (
        <div className="flex border-b border-gray-200 py-2 " key={evento.id}>
          <div>
            <h3 className="font-semibold">{evento.titulo}</h3>
            {evento.fecha && <p>Fecha: {evento.fecha}</p>}
            {/* <p>{evento.descripcion}</p> */}
          </div>

          {evento.cantidad && <p>${evento.cantidad}</p>}
          {/* {evento.tipo && <p>Tipo: {evento.tipo}</p>} */}
        </div>
      ))}
      <hr className="my-4" />
      <div className="mt-4">
        <p>Ingreso:</p>
        <p>Gasto:</p>
        <p>Mes:</p>
        <p>Global:</p>
      </div>
    </div>
  )
}
