import { z } from 'zod';

import { loginSchema } from '../login/login-schema';

export const signUpSchema = z.object({
  ...loginSchema.shape,
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
