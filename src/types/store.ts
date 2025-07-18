import {z} from 'zod';

export const StoreSchema = z.object({
    role: z.enum(['admin', 'user']).default('user'),
    theme: z.enum(['light', 'dark']).default('light'),
    setTheme: z.function().args(z.enum(['light', 'dark'])).returns(z.void()),
});

export type StoreType = z.infer<typeof StoreSchema>;