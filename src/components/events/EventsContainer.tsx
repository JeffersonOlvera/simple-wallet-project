interface EventsContainerProps {
  // Define any props that the EventsContainer component might need
  children: React.ReactNode
}

export const EventsContainer = ({ children }: EventsContainerProps) => {
  return <div className="px-4 py-2">{children}</div>
}
