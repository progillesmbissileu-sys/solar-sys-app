import { Input, InputProps } from "@/shared/ui/atoms/Input"

export type NumberInputProps = InputProps & {
  onChange?: (value: string) => void
}

export function NumberInput({ onChange, ...props }: NumberInputProps) {
  return (
    <Input
      {...props}
      type="number"
      onChange={(evt) => onChange?.(evt.target.value)}
    />
  )
}
