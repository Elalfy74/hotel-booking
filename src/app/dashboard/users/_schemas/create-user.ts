import { Role } from '@prisma/client';
import { z } from 'zod';

import { signUpSchema } from '@/components/auth/sign-up/sign-up-schema';
import { fileSchema } from '@/lib/utils';

export const createUserSchema = z.object({
  ...signUpSchema.shape,
  role: z.nativeEnum(Role),
  image: fileSchema,
});
export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
