"use server"

import { callAction } from "@/shared/api"
import { setServerAccessToken } from "./server-token"
import { redirect } from "next/navigation"

export async function logout() {
  await setServerAccessToken("")
  await callAction("/api/logout", "get")()

  redirect("/login")
}
