import { Role } from '@prisma/client';
import { z } from 'zod';

import { signUpSchema } from '@/components/auth/sign-up/sign-up-schema';
import { imageSchema } from '@/lib/utils';

export const createUserSchema = z.object({
  ...signUpSchema.shape,
  role: z.nativeEnum(Role),
  image: imageSchema,
});
export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
