import { env } from "@/shared/config"
import {
  REFRESH_TOKEN_COOKIE_NAME,
  TOKEN_COOKIE_NAME,
} from "@/shared/lib/auth/constant"
import { AuthTokens } from "@/shared/lib/auth/types"

export async function login(credentials: {
  email: string
  password: string
}): Promise<AuthTokens> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  const data = await response.json()
  const tokens: AuthTokens = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  }

  // Store tokens in cookies (client-side)
  if (typeof window !== "undefined") {
    document.cookie = `${TOKEN_COOKIE_NAME}=${tokens.accessToken}; path=/; max-age=${env.NEXT_PUBLIC_COOKIE_MAX_AGE}; samesite=strict; secure`
    document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=${tokens.refreshToken}; path=/; max-age=${env.NEXT_PUBLIC_COOKIE_MAX_AGE}; samesite=strict; secure`
  }

  return tokens
}
