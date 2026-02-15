"use server"

import { callAction } from "@/shared/api"
import { AuthTokens, setServerTokens } from "@/shared/lib"

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

  console.log("RESPONSE", response)

  if (response?.data) {
    const tokens: AuthTokens = {
      accessToken: response.data?.accessToken ?? "",
      refreshToken: response.data?.refreshToken ?? "",
    }
    await setServerTokens(tokens.accessToken, tokens.refreshToken)
  }
}
