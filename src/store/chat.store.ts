import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as webllm from '@mlc-ai/web-llm'
import type { ChatMessage, ChatConfig } from '@/types/chat.type'

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error'

interface ChatState {
  engine: webllm.MLCEngine | null
  modelStatus: ModelStatus
  loadingProgress: number
  errorMessage: string | null

  messages: ChatMessage[]
  isGenerating: boolean
  config: ChatConfig

  initializeModel: () => Promise<void>
  sendMessage: (content: string, context?: any) => Promise<void>
  clearChat: () => void
  updateConfig: (config: Partial<ChatConfig>) => void
  setModelStatus: (status: ModelStatus) => void
  setLoadingProgress: (progress: number) => void
}

const SYSTEM_PROMPT = `Eres un asistente financiero inteligente integrado en Walletfy, una aplicación de gestión de finanzas personales. Tu rol es ayudar a los usuarios a entender y analizar sus datos financieros.

CONTEXTO: Recibirás datos de la aplicación en formato JSON que incluyen el balance actual, eventos de ingresos/egresos, y estadísticas.

INSTRUCCIONES:
- Analiza los datos proporcionados y responde de manera clara y útil
- Ofrece insights financieros basados en los datos reales del usuario
- Sugiere mejoras y recomendaciones personalizadas
- Mantén un tono amigable y profesional
- Si no tienes datos suficientes, pregunta al usuario por más información
- Responde en español

CAPACIDADES:
- Análisis de patrones de gastos e ingresos
- Cálculo de tendencias financieras
- Recomendaciones de presupuesto
- Explicación de los balances y flujos de dinero`

const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      engine: null,
      modelStatus: 'idle',
      loadingProgress: 0,
      errorMessage: null,
      messages: [],
      isGenerating: false,
      config: {
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1000,
      },

      initializeModel: async () => {
        try {
          set({
            modelStatus: 'loading',
            loadingProgress: 0,
            errorMessage: null,
          })

          const engine = new webllm.MLCEngine()

          engine.setInitProgressCallback((progress: { progress: number }) => {
            const percentage = Math.round(progress.progress * 100)
            set({ loadingProgress: percentage })
          })
          
          await engine.reload('Llama-3.2-3B-Instruct-q4f16_1-MLC')

          set({
            engine,
            modelStatus: 'ready',
            loadingProgress: 100,
            errorMessage: null,
          })

          console.log('✅ WebLLM model loaded successfully')
        } catch (error) {
          console.error('❌ Error loading WebLLM model:', error)
          set({
            modelStatus: 'error',
            errorMessage:
              error instanceof Error ? error.message : 'Error desconocido',
          })
        }
      },

      sendMessage: async (content: string, context?: any) => {
        const { engine, config, messages } = get()

        if (!engine || get().modelStatus !== 'ready') {
          throw new Error(
            'El modelo no está listo. Por favor espera a que se cargue.',
          )
        }

        try {
          set({ isGenerating: true })

          const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
            timestamp: new Date(),
          }

          // Construir mensajes con tipos explícitos para WebLLM
          const chatMessages: webllm.ChatCompletionMessageParam[] = [
            {
              role: 'system' as const,
              content: SYSTEM_PROMPT,
            },
            ...messages.map((msg): webllm.ChatCompletionMessageParam => ({
              role: msg.role as 'user' | 'assistant',
              content: msg.role === 'user' && context
                ? `DATOS DE WALLETFY: ${JSON.stringify(context, null, 2)}\n\nPREGUNTA: ${msg.content}`
                : msg.content,
            })),
            {
              role: 'user' as const,
              content: context
                ? `DATOS DE WALLETFY: ${JSON.stringify(context, null, 2)}\n\nPREGUNTA: ${content}`
                : content,
            },
          ]

          const response = await engine.chat.completions.create({
            messages: chatMessages,
            temperature: config.temperature,
            top_p: config.top_p,
            max_tokens: config.max_tokens,
          })

          const assistantContent =
            response.choices[0]?.message?.content ||
            'Lo siento, no pude generar una respuesta.'

          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: assistantContent,
            timestamp: new Date(),
          }

          set({
            messages: [...messages, userMessage, assistantMessage],
            isGenerating: false,
          })
        } catch (error) {
          console.error('❌ Error sending message:', error)
          set({ isGenerating: false })
          throw error
        }
      },

      clearChat: () => {
        set({ messages: [] })
      },

      updateConfig: (newConfig: Partial<ChatConfig>) => {
        set({ config: { ...get().config, ...newConfig } })
      },

      setModelStatus: (status: ModelStatus) => {
        set({ modelStatus: status })
      },

      setLoadingProgress: (progress: number) => {
        set({ loadingProgress: progress })
      },
    }),
    {
      name: 'walletfy-chat-storage',
      partialize: (state) => ({
        messages: state.messages,
        config: state.config,
      }),
    },
  ),
)

export default useChatStore