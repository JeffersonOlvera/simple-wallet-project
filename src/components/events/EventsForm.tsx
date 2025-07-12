import Button from '../Button'
import Input from '../Input'

export const EventsForm = () => {
  return (
    <div className="px-4 py-2 flex flex-col gap-4">
      <Input
        label="Dinero inicial"
        placeholder="Buscar..."
        type="number"
        block={true}
      />
      <div className="w-full flex justify-between gap-2">
        <Button className="w-full">Calcular</Button>
        <Button className="w-full">Añadir</Button>
      </div>
    </div>
  )
}
