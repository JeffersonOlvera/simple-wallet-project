interface Props extends React.ComponentPropsWithoutRef<'div'> {
  titulo: string
  fecha?: string
  descripcion?: string
  cantidad?: string
  tipo?: 'Egreso' | 'Ingreso'
}

export const EventsCardBody = ({
  titulo,
  fecha,
  //   descripcion,
  cantidad,
  tipo,
}: Props) => {
  return (
    <div className="flex py-2 w-full bg-gray-50 hover:bg-gray-100 px-2 rounded-lg">
      <div className="w-3/4">
        <h3 className="font-semibold">{titulo}</h3>
        {fecha && <p>{fecha}</p>}
      </div>
      <p
        className={`${tipo === 'Ingreso' ? 'text-green-600' : 'text-red-400'} text-right w-1/4`}
      >
        {cantidad && (
          <span className="text-sm font-bold ">
            {tipo === 'Ingreso' ? '' : '-'} ${cantidad}
          </span>
        )}
      </p>
    </div>
  )
}
