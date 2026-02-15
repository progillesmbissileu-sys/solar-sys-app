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
async function setServerAccessToken(token: string): Promise<void> {
  const cookieStore = await import("next/headers").then(({ cookies }) =>
    cookies(),
  )
  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
}

async function setServerRefreshToken(token: string): Promise<void> {
  const cookieStore = await import("next/headers").then(({ cookies }) =>
    cookies(),
  )
  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
}

async function setServerTokens(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  await setServerAccessToken(accessToken)
  await setServerRefreshToken(refreshToken)
}

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

export {
  getServerAccessToken,
  getServerRefreshToken,
  setServerTokens,
  setServerAccessToken,
  setServerRefreshToken,
}
