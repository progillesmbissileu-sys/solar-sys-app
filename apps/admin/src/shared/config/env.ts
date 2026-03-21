import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z
    .url('NEXT_PUBLIC_API_ENDPOINT must be a valid URL')
    .min(1, 'NEXT_PUBLIC_API_ENDPOINT is required'),
  NEXT_PUBLIC_APP_URL: z
    .url('NEXT_PUBLIC_APP_URL must be a valid URL')
    .min(1, 'NEXT_PUBLIC_APP_URL is required'),
  AUTH_ACCESS_COOKIE_MAX_AGE_SECONDS: z.preprocess(
    (value) => (value === undefined || value === null || value === '' ? undefined : Number(value)),
    z
      .number()
      .int('AUTH_ACCESS_COOKIE_MAX_AGE_SECONDS must be an integer')
      .positive('AUTH_ACCESS_COOKIE_MAX_AGE_SECONDS must be greater than 0')
      .max(60 * 60 * 24 * 365, 'AUTH_ACCESS_COOKIE_MAX_AGE_SECONDS must be <= 1 year')
      .optional()
  ),
  AUTH_REFRESH_COOKIE_MAX_AGE_SECONDS: z.preprocess(
    (value) => (value === undefined || value === null || value === '' ? undefined : Number(value)),
    z
      .number()
      .int('AUTH_REFRESH_COOKIE_MAX_AGE_SECONDS must be an integer')
      .positive('AUTH_REFRESH_COOKIE_MAX_AGE_SECONDS must be greater than 0')
      .max(60 * 60 * 24 * 365, 'AUTH_REFRESH_COOKIE_MAX_AGE_SECONDS must be <= 1 year')
      .optional()
  ),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_COOKIE_MAX_AGE: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  AUTH_ACCESS_COOKIE_MAX_AGE_SECONDS: process.env.AUTH_ACCESS_COOKIE_MAX_AGE_SECONDS,
  AUTH_REFRESH_COOKIE_MAX_AGE_SECONDS: process.env.AUTH_REFRESH_COOKIE_MAX_AGE_SECONDS,
});
