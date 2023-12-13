import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 character(s)',
    })
    .max(30, {
      message: 'Password must be at most 30 character(s)',
    }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
