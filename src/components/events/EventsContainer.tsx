interface EventsContainerProps {
  children: React.ReactNode
}

export const EventsContainer = ({ children }: EventsContainerProps) => {
  return (
    <div className="rounded-md">
      {/* <p className="my-2 px-4 py-2 rounded bg-white text-sm text-gray-600">
        Click en el evento para editar
      </p> */}
      <p className="my-2 px-4 py-2  rounded text-gray-600">Eventos</p>
      {/* Grid layout for events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  )
}
