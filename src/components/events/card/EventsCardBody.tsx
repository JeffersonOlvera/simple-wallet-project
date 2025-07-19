interface Props extends React.ComponentPropsWithoutRef<'div'> {
  titulo: string
  fecha?: string
  descripcion?: string
  cantidad?: string
  tipo?: 'Egreso' | 'Ingreso'
}

export const EventsCardBody = ({ titulo, fecha, cantidad, tipo }: Props) => {
  return (
    <div className="flex py-2 w-full bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 px-2 rounded-lg transition-colors">
      <div className="w-3/4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {titulo}
        </h3>
        {fecha && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">{fecha}</p>
        )}
      </div>
      <p
        className={`${
          tipo === 'Ingreso'
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-400 dark:text-red-300'
        } text-right w-1/4`}
      >
        {cantidad && (
          <span className="text-sm font-bold">
            {tipo === 'Ingreso' ? '' : '-'} ${cantidad}
          </span>
        )}
      </p>
    </div>
  )
}
