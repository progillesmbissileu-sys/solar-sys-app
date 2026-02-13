import {
  REFRESH_TOKEN_COOKIE_NAME,
  TOKEN_COOKIE_NAME,
} from "@/shared/lib/auth/constant"

/**
 * Login function - call your API and store tokens in cookies
 */

/**
 * Server-side function to get access token from cookies
 */
async function getServerAccessToken(): Promise<string | null> {
  const cookieStore = await import("next/headers").then(({ cookies }) =>
    cookies(),
  )
  const token = cookieStore.get(TOKEN_COOKIE_NAME)
  return token?.value || null
}

/**
 * Server-side function to get refresh token from cookies
 */
async function getServerRefreshToken(): Promise<string | null> {
  const cookieStore = await import("next/headers").then(({ cookies }) =>
    cookies(),
  )
  const token = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)
  return token?.value || null
}

/**
 * Logout - clear all auth cookies
 */

export { getServerAccessToken, getServerRefreshToken }
