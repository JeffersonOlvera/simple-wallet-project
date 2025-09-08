import React, { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  isGenerating?: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  isGenerating = false,
}) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled && !isGenerating) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={
          disabled
            ? 'Cargando modelo...'
            : 'Escribe tu pregunta sobre tus finanzas...'
        }
        disabled={disabled || isGenerating}
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-purple-500 focus:border-transparent
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        disabled={disabled || isGenerating || !message.trim()}
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 
                   disabled:cursor-not-allowed text-white rounded-lg transition-colors
                   flex items-center justify-center min-w-[48px]"
      >
        {isGenerating ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={18} />
        )}
      </button>
    </form>
  )
}
