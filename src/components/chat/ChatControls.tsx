import React from 'react'
import { Trash2, Settings, X, RotateCcw, Info } from 'lucide-react'
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
  const [showClearConfirm, setShowClearConfirm] = React.useState(false)

  const handleClearChat = () => {
    if (showClearConfirm) {
      onClearChat()
      setShowClearConfirm(false)
    } else {
      setShowClearConfirm(true)
      // Auto-reset confirmation after 3 seconds
      setTimeout(() => setShowClearConfirm(false), 3000)
    }
  }

  const resetToDefaults = () => {
    onConfigChange({
      temperature: 0.7,
      top_p: 0.9,
    })
  }

  const presets = {
    conservative: { temperature: 0.3, top_p: 0.5 },
    balanced: { temperature: 0.7, top_p: 0.9 },
    creative: { temperature: 0.9, top_p: 1.0 },
  }

  const applyPreset = (preset: keyof typeof presets) => {
    onConfigChange(presets[preset])
  }

  return (
    <div className="relative">
      {/* Main Controls Row */}
      <div className="flex items-center gap-2">
        {/* Settings Toggle */}
        <button
          onClick={() => setShowControls(!showControls)}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md
            transition-all duration-200 border
            ${
              showControls
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700'
                : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          title="Configuración del modelo"
        >
          <Settings size={14} />
          <span className="hidden sm:inline">Config</span>
        </button>

        {/* Clear Chat Button */}
        <button
          onClick={handleClearChat}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md
            transition-all duration-200 border
            ${
              showClearConfirm
                ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700 animate-pulse'
                : 'bg-gray-50 dark:bg-gray-800 text-red-600 dark:text-red-400 border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          title={
            showClearConfirm
              ? 'Confirmar borrar conversación'
              : 'Borrar conversación'
          }
        >
          <Trash2 size={14} />
          <span className="hidden sm:inline">
            {showClearConfirm ? 'Confirmar' : 'Limpiar'}
          </span>
        </button>
      </div>

      {/* Advanced Controls Panel */}
      {showControls && (
        <div className="absolute top-full right-0 mt-2 w-80 max-w-[90vw] z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Configuración del Modelo
              </h3>
              <button
                onClick={() => setShowControls(false)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={16} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Presets Rápidos
                  </span>
                  <Info size={12} className="text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries({
                    conservative: 'Conservador',
                    balanced: 'Equilibrado',
                    creative: 'Creativo',
                  }).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => applyPreset(key as keyof typeof presets)}
                      className="px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-600
                               bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600
                               text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Creatividad
                  </label>
                  <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                    {config.temperature.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.temperature}
                  onChange={(e) =>
                    onConfigChange({ temperature: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                           [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Predecible</span>
                  <span>Creativo</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Diversidad
                  </label>
                  <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                    {config.top_p.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={config.top_p}
                  onChange={(e) =>
                    onConfigChange({ top_p: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                           [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Enfocado</span>
                  <span>Variado</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={resetToDefaults}
                  className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 
                           hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <RotateCcw size={12} />
                  Restaurar valores por defecto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showControls && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowControls(false)}
        />
      )}
    </div>
  )
}
