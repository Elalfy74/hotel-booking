import { z } from 'zod';

import { createCountrySchema } from './create-country';

export const updateCountrySchema = createCountrySchema.partial();
export type UpdateCountryType = z.infer<typeof updateCountrySchema>;
