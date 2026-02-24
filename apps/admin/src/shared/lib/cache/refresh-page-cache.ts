import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export async function refreshPageCache() {
  const headerList = await headers()
  // This gets the current path from the request headers
  const pathname = headerList.get("x-current-path") || "/"

  revalidatePath(pathname)
}
