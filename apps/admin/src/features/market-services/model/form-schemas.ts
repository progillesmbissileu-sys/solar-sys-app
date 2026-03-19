import z from 'zod';

export const updateServiceSchema = z.object({
  id: z.uuid(),
  designation: z.string(),
  shortDescription: z.string(),
  contentDescription: z.string().optional(),
  features: z.array(z.string()).optional(),
});

export const createServiceSchema = z.object({
  designation: z.string(),
  shortDescription: z.string(),
  contentDescription: z.string().optional(),
  features: z.array(z.string()).optional(),
  thumbnail: z.array(z.file()).min(1).max(1),
  thumbnailAlt: z.string(),
});
