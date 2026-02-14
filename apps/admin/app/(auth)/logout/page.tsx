import { logout } from "@/shared/lib/auth/helpers/session"
import { redirect } from "next/navigation"

export default function Page() {
  logout()
  redirect("/login")
}
