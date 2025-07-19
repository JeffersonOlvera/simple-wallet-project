import type { EventType } from '@/types/event.type'

const data: Array<EventType> = [
  {
    id: '1',
    nombre: 'John Doe',
    descripccion: "30",
    cantidad: 5,
    fecha: new Date('2023-10-01'),
    tipo: 'ingreso',
    
  },
  {
    id: '2',
    nombre: 'John Doe',
    descripccion: "30",
    cantidad: 5,
    fecha: new Date('2023-10-01'),
    tipo: 'ingreso',
  },
]

export const getEvents = (tipo?: string) => {
  if (tipo) {
    return data.filter((c) => c.tipo === tipo)
  }

  return data
}

export const getEvent = (id: string) => {
  const event = data.find((c) => c.id === id)

  if (!event) {
    throw new Error('Event not found')
  }

  return event
}
