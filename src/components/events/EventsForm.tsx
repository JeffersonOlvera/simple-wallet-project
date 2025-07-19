import { Button, Input } from '@/components'
import { Label } from '../form/Label'

const clicked = () => {
  console.log('Button clicked')
}

export const EventsForm = () => {
  return (
    <div className="px-6 w-full py-6 flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors shadow-sm dark:shadow-lg">
      <Label label="Dinero inicial" />
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 md:w-3/4 lg:w-4/5">
          <Input
            label="Dinero inicial"
            placeholder="Ingresa el dinero inicial"
            type="number"
            block={true}
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <Button
          className="flex-1 flex justify-center items-center"
          label="Calcular"
          onClick={clicked}
        />
      </div>
    </div>
  )
}
