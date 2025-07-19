interface EventsCardTitleProps {
  mes: string
  anio: string
}

export const EventsCardTitle = ({ mes, anio }: EventsCardTitleProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100 transition-colors">
        {mes} {anio}
      </h2>
    </div>
  )
}
