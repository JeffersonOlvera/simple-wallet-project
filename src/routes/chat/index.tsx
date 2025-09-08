import { createFileRoute } from '@tanstack/react-router'
import { ChatInterface } from '@/components/chat/ChatInterface'

export const Route = createFileRoute('/chat/')({
  component: ChatPage,
})

function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  )
}
