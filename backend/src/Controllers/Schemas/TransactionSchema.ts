import { z } from 'zod';

export const TransactionSchema = z.object({
  amount: z.number(),
}).required()
  .strict();
