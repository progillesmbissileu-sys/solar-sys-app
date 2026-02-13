import { useFormContext } from "./form-config"
import { Button } from "@/shared/ui/atoms/Button"

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(s) => s.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting}>
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}
