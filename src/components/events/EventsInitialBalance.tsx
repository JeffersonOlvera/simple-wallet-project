// src/components/events/EventsInitialBalance.tsx
import { useEffect, useState } from 'react'
import { Label } from '../form/Label'
import { Button, Input } from '@/components'
import useAppStore from '@/store'

export const EventsInitialBalance = () => {
  const { initialBalance, setInitialBalance } = useAppStore()
  const [inputValue, setInputValue] = useState(initialBalance.toString())
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setInputValue(initialBalance.toString())
  }, [initialBalance])

  const handleSave = () => {
    const newBalance = parseFloat(inputValue)
    
    if (isNaN(newBalance) || newBalance < 0) {
      alert('Por favor ingresa un valor válido')
      setInputValue(initialBalance.toString())
      return
    }

    setInitialBalance(newBalance)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setInputValue(initialBalance.toString())
    setIsEditing(false)
  }

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`
  }

  return (
    <div className="px-6 w-full py-6 flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors shadow-sm dark:shadow-lg">
      <div className="flex items-center justify-between">
        <Label label="Balance Inicial" />
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Editar
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              label=""
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              block={true}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="flex gap-2">
            <Button
              label="Guardar"
              onClick={handleSave}
              variant="solid"
              
              
            />
            <Button
              label="Cancelar"
              onClick={handleCancel}
              variant="outline"
              color="gray"
              
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(initialBalance)}
          </span>

        </div>
      )}

    </div>
  )
}