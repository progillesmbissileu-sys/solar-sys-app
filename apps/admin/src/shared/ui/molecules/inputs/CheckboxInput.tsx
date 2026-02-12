import { Checkbox } from "@/shared/ui/atoms/Checkbox"
import { CheckboxProps } from "@radix-ui/react-checkbox"

export type CheckboxInputProps = CheckboxProps

export function CheckboxInput(props: CheckboxInputProps) {
  return <Checkbox {...props} />
}
