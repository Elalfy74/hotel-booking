import { z } from 'zod';

import { createUserSchema } from './create-user';

export const updateUserSchema = createUserSchema.omit({ password: true }).partial();
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
