import { Input, InputProps } from "@/shared/ui/atoms/Input"

export type EmailInputProps = InputProps & {
  onChange?: (value: string) => void
}

export function EmailInput({ onChange, ...props }: EmailInputProps) {
  return (
    <Input
      {...props}
      type="email"
      onChange={(evt) => onChange?.(evt.target?.value)}
    />
  )
}
