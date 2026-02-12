import { SelectProps } from "@radix-ui/react-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/atoms/Select"

export type SelectInputProps = SelectProps & {
  onChange?: (value: string) => void
  options?: Array<{ label: string; value: string }>
  placeholder?: string
}

export function SelectInput({
  onChange,
  placeholder,
  options,
  ...props
}: SelectInputProps) {
  return (
    <Select {...props} onValueChange={(value) => onChange?.(value)}>
      <SelectTrigger className="w-full py-1.5 sm:w-44">
        <SelectValue placeholder={`${placeholder || "Select an option"}...`} />
      </SelectTrigger>
      <SelectContent align="end">
        {options?.map(({ label, value }) => (
          <SelectItem value={value} key={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
