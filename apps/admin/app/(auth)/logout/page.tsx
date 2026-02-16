"use client"

import { appRoutes } from "@/shared/routes"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    ;(async () => {
      let canRedirect = false

      try {
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/session/logout`,
          {
            method: "DELETE",
          },
        )

        canRedirect = !!response.ok
      } catch (error) {
        console.error(error)
      }

      if (canRedirect) {
        redirect(appRoutes.LOGIN)
      }
    })()
  }, [])

  return <div className="h-screen w-screen text-white">Logout ...</div>
}
