import { App } from "@/app/entrypoint/App"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <App>{children}</App>
}
