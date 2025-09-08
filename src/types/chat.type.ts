export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface ChatConfig {
  temperature: number
  top_p: number
  max_tokens: number
}

export interface WalletfyContextData {
  user: {
    name: string
    email: string
  } | null
  balance: {
    inicial: number
    global: number
    mensual: number
    totalIngresos: number
    totalEgresos: number
  }
  eventos: Array<{
    id: string
    nombre: string
    descripcion?: string
    cantidad: number
    fecha: string
    tipo: 'ingreso' | 'gasto'
  }>
  estadisticas: {
    totalEventos: number
    promedioMensual: number
    mayorIngreso: number
    mayorEgreso: number
  }
}