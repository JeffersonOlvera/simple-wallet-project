interface EventsCardTitleProps {
  // Define any props that the EventsCardTitle component might need
  mes: string
  anio: string
}

export const EventsCardTitle = ({ mes, anio }: EventsCardTitleProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-slate-900">
        {mes} {anio}
      </h2>
    </div>
  )
}
