import z from 'zod';

export const activateCategorySchema = z.object({
  id: z.string(),
});
