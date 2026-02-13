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

export function getClientAccessToken(): string | null {
  if (typeof window === "undefined") return null

  const name = TOKEN_COOKIE_NAME + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(";")

  for (let cookie of cookieArray) {
    cookie = cookie.trim()
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length)
    }
  }
  return null
}

/**
 * Refresh the access token using the refresh token
 */

/**
 * Client-side function to get refresh token from cookies
 */
export function getClientRefreshToken(): string | null {
  if (typeof window === "undefined") return null

  const name = REFRESH_TOKEN_COOKIE_NAME + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(";")

  for (let cookie of cookieArray) {
    cookie = cookie.trim()
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length)
    }
  }
  return null
}

/**
 * Logout - clear all auth cookies
 */
