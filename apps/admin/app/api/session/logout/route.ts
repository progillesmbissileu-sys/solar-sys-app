import { callAction } from "@/shared/api"
import {
  REFRESH_TOKEN_COOKIE_NAME,
  TOKEN_COOKIE_NAME,
} from "@/shared/lib/auth/constant"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function DELETE() {
  const cookieStore = await cookies()

  await callAction("/api/logout", "get")()

  cookieStore.delete(TOKEN_COOKIE_NAME)
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME)

  return new NextResponse(null, { status: 204 })
}
