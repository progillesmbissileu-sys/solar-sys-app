const envSchema = {
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_COOKIE_MAX_AGE: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE
    ? parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE)
    : undefined,
}

Object.entries(envSchema).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing env variable: ${key}`)
})
export const env = envSchema
