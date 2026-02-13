import { env } from "@/shared/config"
import { getClientRefreshToken } from "@/shared/lib/auth/helpers/client-token"
import {
  REFRESH_TOKEN_COOKIE_NAME,
  TOKEN_COOKIE_NAME,
} from "@/shared/lib/auth/constant"

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken =
    typeof window !== "undefined"
      ? getClientRefreshToken()
      : await import("./server-token").then(({ getServerAccessToken }) =>
          getServerAccessToken(),
        )

  if (!refreshToken) {
    return null
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      },
    )

    if (!response.ok) {
      // Refresh token is invalid, clear cookies
      logout()
      return null
    }

    const data = await response.json()
    const newAccessToken = data.accessToken

    // Update access token in cookies
    if (typeof window !== "undefined") {
      document.cookie = `${TOKEN_COOKIE_NAME}=${newAccessToken}; path=/; max-age=${env.NEXT_PUBLIC_COOKIE_MAX_AGE}; samesite=strict; secure`
    }

    return newAccessToken
  } catch (error) {
    console.error("Token refresh failed:", error)
    return null
  }
}

export function logout(): void {
  if (typeof window !== "undefined") {
    document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; max-age=0`
    document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=; path=/; max-age=0`
  }
}
