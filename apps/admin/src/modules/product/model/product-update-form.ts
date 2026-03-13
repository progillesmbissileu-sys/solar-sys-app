import z from 'zod';

export const productUpdateFormSchema = z.object({
  id: z.string().min(1),
  designation: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  categoryId: z.uuid(),
  brand: z.string().optional(),
});

export type ProductUpdateFormValues = z.infer<typeof productUpdateFormSchema>;
