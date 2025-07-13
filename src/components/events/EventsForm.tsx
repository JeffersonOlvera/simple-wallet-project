import { Button, Input } from '@/components'

const clicked = () => {
  console.log('Button clicked')
}

export const EventsForm = () => {
  return (
    <div className="px-4 py-2 flex flex-col gap-4">
      <Input
        label="Dinero inicial"
        placeholder="Ingresa el dinero inicial"
        type="number"
        block={true}
      />
      <div className="w-full flex justify-between gap-2">
        <Button className="w-full" label="Calcular" onClick={clicked}></Button>
        <Button className="w-full" label="Añadir" onClick={clicked}></Button>
      </div>
    </div>
  )
}
