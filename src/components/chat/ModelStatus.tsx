import React from 'react'
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import type { ModelStatus } from '@/store/chat.store'

interface ModelStatusProps {
  status: ModelStatus
  progress: number
  errorMessage?: string | null
}

export const ModelStatusComponent: React.FC<ModelStatusProps> = ({
  status,
  progress,
  errorMessage,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return {
          icon: <Loader2 className="animate-spin" size={16} />,
          text: `Cargando modelo... ${progress}%`,
          className:
            'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
        }
      case 'ready':
        return {
          icon: <CheckCircle size={16} />,
          text: 'Modelo cargado y listo',
          className:
            'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
        }
      case 'error':
        return {
          icon: <AlertCircle size={16} />,
          text: `Error: ${errorMessage || 'Error desconocido'}`,
          className:
            'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
        }
      default:
        return {
          icon: null,
          text: 'Inicializando...',
          className:
            'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600',
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${config.className}`}
    >
      {config.icon}
      <span>{config.text}</span>
    </div>
  )
}
