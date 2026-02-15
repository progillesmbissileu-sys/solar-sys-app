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
async function setAccessToken(token: string): Promise<void> {
  const cookieStore = await import("next/headers").then(({ cookies }) =>
    cookies(),
  )
  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })
}

async function setRefreshToken(token: string): Promise<void> {
  const cookieStore = await import("next/headers").then(({ cookies }) =>
    cookies(),
  )
  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })
}

async function setAuthTokens(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  await setAccessToken(accessToken)
  await setRefreshToken(refreshToken)
}

/**
 * Server-side function to get access token from cookies
 */
async function getAccessToken(): Promise<string | null> {
  const cookieStore = await import("next/headers").then(({ cookies }) =>
    cookies(),
  )
  const token = cookieStore.get(TOKEN_COOKIE_NAME)

  return token?.value || null
}

/**
 * Server-side function to get refresh token from cookies
 */
async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await import("next/headers").then(({ cookies }) =>
    cookies(),
  )
  const token = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)
  return token?.value || null
}

export {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  setAccessToken,
  setRefreshToken,
}
