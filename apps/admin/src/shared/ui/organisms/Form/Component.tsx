import { useFormContext } from "./use-form-context"

function SubmitButton({ label }: { label: string }) {
  const form = useFormContext()

  return (
    <form.AppForm>
      <form.SubscribeButton label={label} />
    </form.AppForm>
  )
}

export { SubmitButton }
