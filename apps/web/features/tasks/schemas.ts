import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200),

  description: z
    .string()
    .max(2000)
    .optional(),

  priority: z.enum([
    'LOW',
    'MEDIUM',
    'HIGH',
  ]),

  dueDate: z
    .string()
    .optional(),
});

export type TaskFormData =
  z.infer<typeof taskSchema>;