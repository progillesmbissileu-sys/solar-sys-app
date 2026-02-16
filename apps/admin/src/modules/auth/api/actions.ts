"use server"

import { callAction } from "@/shared/api"
import { AuthTokens, setAuthTokens } from "@/shared/lib"
import { appRoutes } from "@/shared/routes"
import { redirect } from "next/navigation"

export default async function loginAction(_prev: unknown, formData: FormData) {
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const response = await callAction<
    any,
    {
      data: { accessToken: string; refreshToken: string }
    }
  >("/api/login", "post", {
    skipAuth: true,
  })(credentials)

  if (response?.data) {
    const tokens: AuthTokens = {
      accessToken: response.data?.accessToken ?? "",
      refreshToken: response.data?.refreshToken ?? "",
    }
    await setAuthTokens(tokens.accessToken, tokens.refreshToken)

    redirect(appRoutes.DASHBOARD)
  }
}
