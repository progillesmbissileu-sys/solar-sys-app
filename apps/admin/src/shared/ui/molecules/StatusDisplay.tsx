import { Badge } from "@/shared/ui/atoms/Badge"

export const StatusDisplay = ({ status }: { status: string }) => {
  return <Badge className="rounded-sm">{status}</Badge>
}
