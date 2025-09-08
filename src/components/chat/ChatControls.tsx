import React from 'react'
import { Trash2, Settings } from 'lucide-react'
import type { ChatConfig } from '@/types/chat.type'

interface ChatControlsProps {
  config: ChatConfig
  onConfigChange: (config: Partial<ChatConfig>) => void
  onClearChat: () => void
  disabled?: boolean
}

export const ChatControls: React.FC<ChatControlsProps> = ({
  config,
  onConfigChange,
  onClearChat,
  disabled = false,
}) => {
  const [showControls, setShowControls] = React.useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 
                     hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <Settings size={16} />
          Configuración
        </button>

        <button
          onClick={onClearChat}
          disabled={disabled}
          className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 
                     hover:text-red-800 dark:hover:text-red-300 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={16} />
          Limpiar Chat
        </button>
      </div>

      {showControls && (
        <div
          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border 
                        border-gray-200 dark:border-gray-600 space-y-3"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Temperature: {config.temperature}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.temperature}
              onChange={(e) =>
                onConfigChange({ temperature: parseFloat(e.target.value) })
              }
              className="w-full"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Controla la creatividad (0 = conservador, 1 = creativo)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Top P: {config.top_p}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.top_p}
              onChange={(e) =>
                onConfigChange({ top_p: parseFloat(e.target.value) })
              }
              className="w-full"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Controla la diversidad de respuestas
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
