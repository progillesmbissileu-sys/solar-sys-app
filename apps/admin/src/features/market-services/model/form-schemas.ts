import z from 'zod';

export const updateServiceSchema = z.object({
  id: z.string().optional(),
  designation: z.string(),
  shortDescription: z.string(),
  contentDescription: z.string(),
  features: z.array(z.string()),
  thumbnail: z.array(z.file()).min(1).max(1),
  thumbnailAlt: z.string(),
});

export const createServiceSchema = updateServiceSchema;
