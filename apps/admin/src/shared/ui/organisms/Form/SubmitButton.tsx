import { useFormContext } from "./form-config"
import { Button, ButtonProps } from "@/shared/ui/atoms/Button"
import { cx } from "@/shared/lib/utils"

export function SubscribeButton({
  label,
  className,
  ...props
}: ButtonProps & { label: string }) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(s) => s.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cx("w-full", className)}
          {...props}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}
