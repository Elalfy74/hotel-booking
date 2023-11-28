import { Role } from '@prisma/client';
import { z } from 'zod';

export const editUserSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  email: z.string().email(),
  role: z.nativeEnum(Role),
  image: z.string().url(),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
