import { Role } from '@prisma/client';
import { z } from 'zod';

import { signUpSchema } from '@/components/auth/sign-up/sign-up-schema';

const fileSchema = z.custom<File | MediaSource>((data) => {
  return typeof window === 'undefined' ? data instanceof MediaSource : data instanceof File;
}, 'Avatar is Required');

export const createUserSchema = z.object({
  ...signUpSchema.shape,
  role: z.nativeEnum(Role),
  image: fileSchema,
});

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
