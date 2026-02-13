import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { withFieldContext } from "@/shared/ui/organisms/Form/withFieldContext"
import {
  CheckboxInput,
  CheckboxInputProps,
  EmailInput,
  EmailInputProps,
  PasswordInput,
  PasswordInputProps,
  SelectInput,
  SelectInputProps,
  TextInput,
  TextInputProps,
} from "@/shared/ui/molecules/inputs"
import { SubscribeButton } from "./SubmitButton"

const Input = withFieldContext<TextInputProps>(TextInput)
const Password = withFieldContext<PasswordInputProps>(PasswordInput)
const Email = withFieldContext<EmailInputProps>(EmailInput)
const Select = withFieldContext<SelectInputProps>(SelectInput)
const Checkbox = withFieldContext<CheckboxInputProps>(CheckboxInput)

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  formComponents: {
    SubscribeButton,
  },
  fieldComponents: {
    Input,
    Password,
    Email,
    Select,
    Checkbox,
  },
})
