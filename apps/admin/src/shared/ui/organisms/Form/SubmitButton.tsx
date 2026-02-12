import { useFormContext } from "@/shared/ui/organisms/Form/use-form-context"
import { Button } from "@/shared/ui/atoms/Button"

export function SubmitButton({ label }: { label: string }) {
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
