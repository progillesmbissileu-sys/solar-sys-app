import { env } from "@/shared/config"
import { logout } from "./logout"

export async function refreshAccessToken(): Promise<string | void> {
  const refreshToken = await import("./server-token").then(
    ({ getServerAccessToken }) => getServerAccessToken(),
  )

  if (!refreshToken) {
    return
  }

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/refresh`,
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
      await logout()
      return
    }

    const data = await response.json()
    const newAccessToken = data.accessToken

    // Update access token in cookies
    await import("./server-token").then(({ setServerAccessToken }) =>
      setServerAccessToken(newAccessToken),
    )
    return newAccessToken
  } catch (error) {
    console.error("Token refresh failed:", error)
    return
  }
}
