import { WithFormBlockProps } from "./types"
import { useFormContext } from "./use-form-context"
import {
  CheckboxInputProps,
  SelectInputProps,
  TextInputProps,
} from "@/shared/ui/molecules/inputs"

function Text(props: TextInputProps & WithFormBlockProps) {
  const form = useFormContext()

  return (
    <form.AppField
      name={props.name}
      children={(field) => <field.Input {...props} />}
    />
  )
}

function Password(props: TextInputProps & WithFormBlockProps) {
  const form = useFormContext()

  return (
    <form.AppField
      name={props.name}
      children={(field) => <field.Password {...props} />}
    />
  )
}

function Email(props: TextInputProps & WithFormBlockProps) {
  const form = useFormContext()

  return (
    <form.AppField
      name={props.name}
      children={(field) => <field.Email {...props} />}
    />
  )
}

function Select(props: SelectInputProps & WithFormBlockProps) {
  const form = useFormContext()

  return (
    <form.AppField
      name={props.name}
      children={(field) => <field.Select {...props} />}
    />
  )
}

function Checkbox(props: CheckboxInputProps & WithFormBlockProps) {
  const form = useFormContext()

  return (
    <form.AppField
      name={props.name}
      children={(field) => <field.Checkbox {...props} />}
    />
  )
}

export { Text, Password, Email, Select, Checkbox }
