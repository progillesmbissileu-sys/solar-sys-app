import { SidebarProvider } from "@/shared/ui/molecules/sidebar/SidebarProvider"
import { ThemeProvider } from "next-themes"
import { cookies } from "next/headers"
import { Layout } from "@/app/components/layouts"

export async function App({ children }: { children: any }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <ThemeProvider
      defaultTheme="system"
      disableTransitionOnChange
      attribute="class"
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <Layout>{children}</Layout>
      </SidebarProvider>
    </ThemeProvider>
  )
}
