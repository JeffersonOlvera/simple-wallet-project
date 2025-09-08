import React, { useState, useEffect } from 'react'
import { CheckCircle, Loader2, AlertCircle, X } from 'lucide-react'
import type { ModelStatus } from '@/store/chat.store'

interface ModelStatusProps {
  status: ModelStatus
  progress: number
  errorMessage?: string | null
  onDismiss?: () => void
}

export const ModelStatusComponent: React.FC<ModelStatusProps> = ({
  status,
  progress,
  errorMessage,
  onDismiss,
}) => {
  const [isDismissed, setIsDismissed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Reset dismissed state when status changes
  useEffect(() => {
    setIsDismissed(false)
    setIsVisible(true)
  }, [status, errorMessage])

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (status === 'ready' && !isDismissed) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [status, isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    // Wait for animation to complete before marking as dismissed
    setTimeout(() => {
      setIsDismissed(true)
      onDismiss?.()
    }, 300)
  }

  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return {
          icon: <Loader2 className="animate-spin" size={16} />,
          text: `Cargando modelo... ${progress}%`,
          className:
            'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
          canDismiss: false,
        }
      case 'ready':
        return {
          icon: <CheckCircle size={16} />,
          text: 'Modelo cargado y listo',
          className:
            'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
          canDismiss: true,
        }
      case 'error':
        return {
          icon: <AlertCircle size={16} />,
          text: `Error: ${errorMessage || 'Error desconocido'}`,
          className:
            'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
          canDismiss: true,
        }
      default:
        return {
          icon: null,
          text: 'Inicializando...',
          className:
            'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600',
          canDismiss: false,
        }
    }
  }

  const config = getStatusConfig()

  // Don't render if dismissed
  if (isDismissed) {
    return null
  }

  return (
    <div
      className={`
        flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-sm 
        transition-all duration-300 ease-in-out
        ${config.className}
        ${isVisible ? 'opacity-100 transform translate-y-0 mt-3' : 'opacity-0 transform -translate-y-2'}
      `}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {config.icon}
        <span className="truncate">{config.text}</span>
      </div>

      {config.canDismiss && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 
                   transition-colors opacity-70 hover:opacity-100"
          title="Cerrar mensaje"
          aria-label="Cerrar mensaje"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
