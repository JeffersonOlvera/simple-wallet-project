interface EventsContainerProps {
  children: React.ReactNode
}

export const EventsContainer = ({ children }: EventsContainerProps) => {
  return (
    <div className="rounded-md">
      <h2 className="my-2 h2x-4 py-2 rounded text-gray-600 dark:text-gray-300 transition-colors">
        Eventos
      </h2>
      {/* Grid layout for events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  )
}
