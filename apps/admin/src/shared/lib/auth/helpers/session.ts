import { env } from "@/shared/config"

export async function refreshAccessToken(): Promise<string | void> {
  const refreshToken = await import("./server-token").then(
    ({ getAccessToken }) => getAccessToken(),
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
      await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/session/logout`, {
        method: "DELETE",
      })
      return
    }

    const data = await response.json()
    const newAccessToken = data.accessToken

    // Update access token in cookies
    await import("./server-token").then(({ setAccessToken }) =>
      setAccessToken(newAccessToken),
    )
    return newAccessToken
  } catch (error) {
    console.error("Token refresh failed:", error)
    return
  }
}
