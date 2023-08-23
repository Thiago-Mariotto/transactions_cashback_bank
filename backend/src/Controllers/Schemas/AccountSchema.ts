import { z } from 'zod';

export const AccountSchema = z.object({
  name: z.string(),
  documentNumber: z.string(),
  email: z.string(),
  password: z.string(),
  accountType: z.number(),
}).required()
  .strict();
