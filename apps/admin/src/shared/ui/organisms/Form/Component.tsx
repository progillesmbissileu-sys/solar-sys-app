import { ButtonProps } from "../../atoms/Button"
import { useFormContext } from "./use-form-context"

function SubmitButton(props: ButtonProps & { label: string }) {
  const form = useFormContext()

  return (
    <form.AppForm>
      <form.SubscribeButton {...props} />
    </form.AppForm>
  )
}

export { SubmitButton }
