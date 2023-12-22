import { z } from 'zod';

export const addCategorySchema = z.object({
  name: z.string().min(4).max(60),
  description: z.string().optional(),
  isActive: z.boolean(),
});

export const addSubcategorySchema = z.object({
  categoryId: z.string(),
  name: z.string().min(4).max(60),
});

export const addTopicSchema = z.object({
  categoryId: z.string(),
  subcategoryId: z.string(),
  name: z.string().min(4).max(60),
});
