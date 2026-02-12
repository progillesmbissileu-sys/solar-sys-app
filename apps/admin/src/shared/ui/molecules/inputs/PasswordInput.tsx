import { Input, InputProps } from "@/shared/ui/atoms/Input"

export type PasswordInputProps = InputProps & {
  onChange?: (value: string) => void
}

export function PasswordInput({ onChange, ...props }: PasswordInputProps) {
  return (
    <Input
      {...props}
      type="password"
      onChange={(evt) => onChange?.(evt.target?.value)}
    />
  )
}
