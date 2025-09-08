import React from 'react'
// import { format } from 'date-fns'
// import { es } from 'date-fns/locale'
import { User, Bot } from 'lucide-react'
import type { ChatMessage } from '@/types/chat.type'

interface ChatMessageProps {
  message: ChatMessage
}

export const ChatMessageComponent: React.FC<ChatMessageProps> = ({
  message,
}) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-purple-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div
        className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}
      >
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </span>
      </div>
    </div>
  )
}
