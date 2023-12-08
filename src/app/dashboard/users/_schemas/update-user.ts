import { z } from 'zod';

import { createUserSchema } from './create-user';

export const updateUserSchema = createUserSchema.omit({ password: true }).partial();
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
