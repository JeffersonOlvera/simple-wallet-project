import React, { useEffect, useRef } from 'react'
import useChatStore from '@/store/chat.store'
import { useWalletfyContext } from '@/hooks/useWalletfyContext'
import { ChatMessageComponent } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { ModelStatusComponent } from './ModelStatus'
import { ChatControls } from './ChatControls'

export const ChatInterface: React.FC = () => {
  const {
    engine,
    modelStatus,
    loadingProgress,
    errorMessage,
    messages,
    isGenerating,
    config,
    initializeModel,
    sendMessage,
    clearChat,
    updateConfig,
  } = useChatStore()

  const walletfyContext = useWalletfyContext()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!engine && modelStatus === 'idle') {
      initializeModel()
    }
  }, [engine, modelStatus, initializeModel])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessage(content, walletfyContext)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const isDisabled = modelStatus !== 'ready'

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 transition-colors">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Asistente Financiero Walletfy
          </h1>
        </div>

        <ModelStatusComponent
          status={modelStatus}
          progress={loadingProgress}
          errorMessage={errorMessage}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && modelStatus === 'ready' && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p className="text-lg mb-2">¡Hola! 🤖👋</p>
            <p>Soy tu asistente financiero personal. Puedo ayudarte a:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Analizar tus ingresos y gastos</li>
              <li>Calcular tendencias financieras</li>
              <li>Darte recomendaciones personalizadas</li>
              <li>Explicar tu balance actual</li>
            </ul>
            <p className="mt-4 text-sm">¿En qué puedo ayudarte hoy?</p>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessageComponent key={message.id} message={message} />
        ))}

        {isGenerating && (
          <div className="flex gap-3">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 
                            flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Escribiendo...
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <ChatControls
          config={config}
          onConfigChange={updateConfig}
          onClearChat={clearChat}
          disabled={isDisabled}
        />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isDisabled}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  )
}
