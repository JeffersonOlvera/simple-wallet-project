import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string().uuid(),
  nombre: z.string().max(100),
  descripccion: z.string().max(500).optional(),
  cantidad: z.number().positive(),
  fecha: z.coerce.date(),
  tipo: z.enum(['ingreso', 'gasto']),
});

export type Event = z.infer<typeof eventSchema>;

