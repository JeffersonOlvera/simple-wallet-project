import { z } from 'zod'

export const EventSchema = z.object({
  id: z.string().uuid(),
  nombre: z.string().max(100),
  descripccion: z.string().max(500).optional(),
  cantidad: z.coerce.number().positive(),
  fecha: z.coerce.date(),
  tipo: z.enum(['ingreso', 'gasto']),
  adjunto: z.string().optional(),
})

export type EventType = z.infer<typeof EventSchema>

export const CreateEventSchema = EventSchema.omit({
  id: true,
})

export type CreateEventType = z.infer<typeof CreateEventSchema>

export const UpdateEventSchema = EventSchema.partial().extend({
  id: z.string(),
})

export type UpdateEventType = z.infer<typeof UpdateEventSchema>
