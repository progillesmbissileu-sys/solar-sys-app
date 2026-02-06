import { App } from "@/app/entrypoint/App"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <App>{children}</App>
}
