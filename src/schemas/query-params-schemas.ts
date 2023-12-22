import z from 'zod';

export const deleteCategorySchema = z.object({
  categoryId: z.string(),
});

export const deleteSubcategorySchema = z.object({
  categoryId: z.string(),
  subcategoryId: z.string(),
});

export const deleteTopicSchema = z.object({
  categoryId: z.string(),
  subcategoryId: z.string(),
  topicId: z.string(),
});
