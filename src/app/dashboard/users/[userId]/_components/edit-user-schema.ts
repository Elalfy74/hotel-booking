import { z } from 'zod';

import { createUserSchema } from '../../new/_components/create-user-schema';

export const editUserSchema = createUserSchema
  .omit({
    password: true,
  })
  .partial();

export type EditUserSchema = z.infer<typeof editUserSchema>;
