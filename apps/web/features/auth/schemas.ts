import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(50, 'First name is too long'),

    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(50, 'Last name is too long'),

    email: z
      .string()
      .email('Enter a valid email'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );

export const loginSchema = z.object({
  email: z
    .string()
    .email('Enter a valid email'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});
