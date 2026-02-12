import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      disableTransitionOnChange
      attribute="class"
    >
      <div className="bg-foreground dark:bg-foreground-dark">{children}</div>
    </ThemeProvider>
  )
}
